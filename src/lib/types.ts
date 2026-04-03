export interface CraneType {
  id: string
  slug: string
  name: string
  name_plural: string
  description: string | null
  meta_title_template: string | null
  meta_description_template: string | null
  price_day_from: number | null
  price_day_to: number | null
  price_week_from: number | null
  price_week_to: number | null
  typical_capacity_kg: string | null
  typical_height_m: string | null
  typical_reach_m: string | null
  sort_order: number
}

export interface City {
  id: string
  name: string
  slug: string
  state: string
  population: number | null
  lat: number | null
  lng: number | null
}

export interface Company {
  id: string
  name: string
  slug: string
  description: string | null
  website: string | null
  phone: string | null
  email: string | null
  address: string | null
  city: string
  state: string
  zip: string | null
  lat: number | null
  lng: number | null
  google_rating: number | null
  google_reviews_count: number
  google_maps_photo_url: string | null
  logo_url: string | null
  is_premium: boolean
  is_verified: boolean
  price_day_from: number | null
  price_day_to: number | null
  price_week_from: number | null
  price_week_to: number | null
  price_month_from: number | null
  price_month_to: number | null
  price_note: string | null
  service_radius_km: number | null
  service_regions: string[] | null
  opening_hours: string | null
  description_enriched: string | null
}

export interface CompanyCrane {
  id: string
  company_id: string
  crane_type_id: string
  brand: string | null
  model: string | null
  max_capacity_kg: number | null
  max_height_m: number | null
  max_reach_m: number | null
  has_operator: boolean
  has_glass_sucker: boolean
  electric: boolean
  notes: string | null
}

export interface CompanyWithCranes extends Company {
  company_cranes: CompanyCrane[]
}

export interface LeadFormData {
  crane_type_id: string
  city: string
  customer_name: string
  customer_phone: string
  customer_email: string
  project_description: string
  preferred_date: string
  duration_days: number
  company_ids: string[]
  dsgvo_consent: boolean
}
