import { supabase, getServiceSupabase } from './supabase'
import type { CraneType, City, Company, CompanyWithCranes } from './types'

// ============================================
// STATS (for trust bar / dynamic counts)
// ============================================

function roundDown10(n: number): number {
  return Math.floor(n / 10) * 10
}

export async function getSiteStats(): Promise<{
  anbieterCount: number
  staedteCount: number
  avgRating: number
  totalReviews: number
}> {
  const [{ count: firmCount }, { count: cityCount }, { data: ratingData }] = await Promise.all([
    supabase.from('companies').select('*', { count: 'exact', head: true }).eq('is_active', true).eq('is_relevant', true),
    supabase.from('cities').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase
      .from('companies')
      .select('google_rating, google_reviews_count')
      .eq('is_active', true)
      .eq('is_relevant', true)
      .not('google_rating', 'is', null),
  ])

  let avgRating = 4.2
  let totalReviews = 0
  if (ratingData && ratingData.length > 0) {
    const sum = ratingData.reduce((acc, r) => acc + (r.google_rating ?? 0), 0)
    avgRating = Math.round((sum / ratingData.length) * 10) / 10
    totalReviews = ratingData.reduce((acc, r) => acc + (r.google_reviews_count ?? 0), 0)
  }

  return {
    anbieterCount: roundDown10(firmCount ?? 740),
    staedteCount: roundDown10(cityCount ?? 40),
    avgRating,
    totalReviews: Math.floor(totalReviews / 100) * 100,
  }
}

// ============================================
// CRANE TYPES
// ============================================

export async function getCraneTypes(): Promise<CraneType[]> {
  const { data, error } = await supabase
    .from('crane_types')
    .select('*')
    .order('sort_order')

  if (error) throw error
  return data ?? []
}

export async function getCraneTypeBySlug(slug: string): Promise<CraneType | null> {
  const { data, error } = await supabase
    .from('crane_types')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data
}

// ============================================
// CITIES
// ============================================

export async function getCities(): Promise<City[]> {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('is_active', true)
    .order('population', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) return null
  return data
}

// ============================================
// COMPANIES
// ============================================

export async function getCompanyBySlug(slug: string): Promise<CompanyWithCranes | null> {
  const { data, error } = await supabase
    .from('companies')
    .select(`
      *,
      company_cranes (*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .eq('is_relevant', true)
    .single()

  if (error) return null
  return data
}

/**
 * Get other companies in the same city (for cross-linking on company profile).
 */
export async function getOtherCompaniesInCity(
  city: string,
  excludeSlug: string,
  limit: number = 6
): Promise<{ name: string; slug: string; google_rating: number | null }[]> {
  const { data } = await supabase
    .from('companies')
    .select('name, slug, google_rating')
    .eq('city', city)
    .eq('is_active', true)
    .eq('is_relevant', true)
    .neq('slug', excludeSlug)
    .order('google_rating', { ascending: false })
    .limit(limit)

  return data ?? []
}

/**
 * Get companies for a crane type in a city.
 * Uses company_regions to match city, and company_cranes to match crane type.
 */
export async function getCompaniesForCraneAndCity(
  craneTypeId: string,
  cityId: string
): Promise<CompanyWithCranes[]> {
  // Get ALL company IDs that serve this city
  const { data: regionData } = await supabase
    .from('company_regions')
    .select('company_id')
    .eq('city_id', cityId)

  if (!regionData || regionData.length === 0) return []

  const companyIds = [...new Set(regionData.map(r => r.company_id))]

  // Fetch in batches of 50 to avoid URL length limits
  const batchSize = 50
  const firstBatch = companyIds.slice(0, batchSize)

  const { data, error } = await supabase
    .from('companies')
    .select(`
      *,
      company_cranes (*)
    `)
    .in('id', firstBatch)
    .eq('is_active', true)
    .eq('is_relevant', true)
    .order('is_premium', { ascending: false })
    .order('google_rating', { ascending: false })

  if (error) throw error
  const all = data ?? []

  // Sort: companies with matching crane type first, then the rest
  const withType = all.filter((c) =>
    c.company_cranes?.some((cc: any) => cc.crane_type_id === craneTypeId)
  )
  const withoutType = all.filter(
    (c) => !c.company_cranes?.some((cc: any) => cc.crane_type_id === craneTypeId)
  )
  return [...withType, ...withoutType]
}

/**
 * Get cities that have >= minCompanies for a given crane type.
 * Used for generateStaticParams — only generate pages for cities with enough data.
 */
export async function getCitiesWithMinCompanies(
  _craneTypeId: string,
  minCompanies: number = 3
): Promise<City[]> {
  // Get all company_regions and count companies per city
  // (no longer filtered by crane type — most companies lack crane type data)
  const { data: allRegions } = await supabase
    .from('company_regions')
    .select('company_id, city_id')

  if (!allRegions || allRegions.length === 0) return []

  const cityCounts = new Map<string, Set<string>>()
  for (const r of allRegions) {
    if (!cityCounts.has(r.city_id)) cityCounts.set(r.city_id, new Set())
    cityCounts.get(r.city_id)!.add(r.company_id)
  }

  const qualifyingCityIds = [...cityCounts.entries()]
    .filter(([, companies]) => companies.size >= minCompanies)
    .map(([cityId]) => cityId)

  if (qualifyingCityIds.length === 0) return []

  const { data: cities } = await supabase
    .from('cities')
    .select('*')
    .in('id', qualifyingCityIds)
    .eq('is_active', true)
    .order('population', { ascending: false })

  return cities ?? []
}

/**
 * Get top companies that offer a given crane type (for landing page).
 * Limited to 50 to avoid URL length issues with Supabase REST API.
 */
export async function getCompaniesForCraneType(
  craneTypeId: string
): Promise<CompanyWithCranes[]> {
  const { data: craneData } = await supabase
    .from('company_cranes')
    .select('company_id')
    .eq('crane_type_id', craneTypeId)

  if (!craneData || craneData.length === 0) return []

  const companyIds = [...new Set(craneData.map(c => c.company_id))]

  // Fetch in batches of 50 to avoid URL length limits
  const batchSize = 50
  const firstBatch = companyIds.slice(0, batchSize)

  const { data, error } = await supabase
    .from('companies')
    .select(`
      *,
      company_cranes (*)
    `)
    .in('id', firstBatch)
    .eq('is_active', true)
    .eq('is_relevant', true)
    .order('google_rating', { ascending: false })

  if (error) throw error
  return data ?? []
}

/**
 * Get company count per city for a list of cities.
 * Returns a map of cityId → count.
 */
export async function getCompanyCountsPerCity(
  cityIds: string[]
): Promise<Map<string, number>> {
  if (cityIds.length === 0) return new Map()

  const { data: allRegions } = await supabase
    .from('company_regions')
    .select('company_id, city_id')
    .in('city_id', cityIds)

  const counts = new Map<string, number>()
  if (!allRegions) return counts

  const cityCompanies = new Map<string, Set<string>>()
  for (const r of allRegions) {
    if (!cityCompanies.has(r.city_id)) cityCompanies.set(r.city_id, new Set())
    cityCompanies.get(r.city_id)!.add(r.company_id)
  }
  for (const [cityId, companies] of cityCompanies) {
    counts.set(cityId, companies.size)
  }

  return counts
}

// ============================================
// LEADS
// ============================================

export async function submitLead(formData: {
  crane_type_id: string
  city: string
  customer_name: string
  customer_phone: string
  customer_email: string
  project_description: string
  preferred_date: string | null
  duration_days: number | null
  dsgvo_consent: boolean
  company_ids: string[]
}) {
  const { company_ids, ...leadData } = formData
  const sb = getServiceSupabase()

  // Insert lead
  const { data: lead, error: leadError } = await sb
    .from('leads')
    .insert(leadData)
    .select('id')
    .single()

  if (leadError) throw leadError

  // Insert lead_companies
  if (company_ids.length > 0 && lead) {
    const { error: lcError } = await sb
      .from('lead_companies')
      .insert(
        company_ids.map(companyId => ({
          lead_id: lead.id,
          company_id: companyId,
        }))
      )

    if (lcError) throw lcError
  }

  return lead
}
