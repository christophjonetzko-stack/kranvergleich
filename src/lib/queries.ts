import { supabase } from './supabase'
import type { CraneType, City, Company, CompanyWithCranes } from './types'

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

  // Get full company data — all companies in city, not just those with matching crane type
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
  return data ?? []
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

  // Insert lead
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .insert(leadData)
    .select('id')
    .single()

  if (leadError) throw leadError

  // Insert lead_companies
  if (company_ids.length > 0 && lead) {
    const { error: lcError } = await supabase
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
