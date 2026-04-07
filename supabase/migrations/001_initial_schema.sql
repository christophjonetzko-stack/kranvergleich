-- KranVergleich.de - Initial Database Schema
-- Supabase (PostgreSQL)

-- ============================================
-- CRANE TYPES (Referenztabelle)
-- ============================================
CREATE TABLE crane_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,        -- 'minikran-mieten', 'autokran-mieten'
  name TEXT NOT NULL,               -- 'Minikran', 'Autokran'
  name_plural TEXT NOT NULL,        -- 'Minikrane', 'Autokrane'
  description TEXT,
  meta_title_template TEXT,         -- '{name} mieten in {city} | Preise ab {price}€'
  meta_description_template TEXT,
  price_day_from DECIMAL,           -- Branchendurchschnitt Preis von
  price_day_to DECIMAL,             -- Branchendurchschnitt Preis bis
  price_week_from DECIMAL,
  price_week_to DECIMAL,
  typical_capacity_kg TEXT,         -- '1.000 - 3.000 kg'
  typical_height_m TEXT,            -- '10 - 25 m'
  typical_reach_m TEXT,             -- '5 - 18 m'
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- CITIES (für Programmatic SEO)
-- ============================================
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,               -- 'Berlin'
  slug TEXT UNIQUE NOT NULL,        -- 'berlin'
  state TEXT NOT NULL,              -- 'Berlin' (Bundesland)
  population INT,
  lat DECIMAL,
  lng DECIMAL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- COMPANIES (Kranvermietung-Firmen)
-- ============================================
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,              -- Bundesland
  zip TEXT,
  lat DECIMAL,
  lng DECIMAL,
  google_rating DECIMAL,
  google_reviews_count INT DEFAULT 0,
  google_maps_photo_url TEXT,       -- Photo URL aus Outscraper
  google_place_id TEXT,
  logo_url TEXT,
  is_premium BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- COMPANY CRANES (welche Krane bietet die Firma an)
-- ============================================
CREATE TABLE company_cranes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  crane_type_id UUID NOT NULL REFERENCES crane_types(id) ON DELETE CASCADE,
  brand TEXT,                       -- Maeda, Liebherr, Böcker
  model TEXT,
  max_capacity_kg INT,
  max_height_m DECIMAL,
  max_reach_m DECIMAL,
  has_operator BOOLEAN DEFAULT false,
  has_glass_sucker BOOLEAN DEFAULT false,
  electric BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(company_id, crane_type_id)
);

-- ============================================
-- COMPANY REGIONS (welche Städte bedient die Firma)
-- ============================================
CREATE TABLE company_regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  UNIQUE(company_id, city_id)
);

-- ============================================
-- LEADS (Anfragen)
-- ============================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crane_type_id UUID REFERENCES crane_types(id),
  city TEXT NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT NOT NULL,
  project_description TEXT,
  preferred_date DATE,
  duration_days INT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'sent', 'converted', 'cancelled')),
  dsgvo_consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Lead-Company Zuordnung (Multi-Company Inquiry)
CREATE TABLE lead_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  sent_at TIMESTAMPTZ,
  UNIQUE(lead_id, company_id)
);

-- ============================================
-- INDEXES
-- ============================================

-- Companies: Suche nach Stadt/Bundesland
CREATE INDEX idx_companies_city ON companies(city);
CREATE INDEX idx_companies_state ON companies(state);
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_companies_active ON companies(is_active) WHERE is_active = true;

-- Company Cranes: Suche nach Typ
CREATE INDEX idx_company_cranes_company ON company_cranes(company_id);
CREATE INDEX idx_company_cranes_type ON company_cranes(crane_type_id);
CREATE INDEX idx_company_cranes_compound ON company_cranes(company_id, crane_type_id);

-- Company Regions: Suche nach Stadt
CREATE INDEX idx_company_regions_city ON company_regions(city_id);
CREATE INDEX idx_company_regions_company ON company_regions(company_id);
CREATE INDEX idx_company_regions_compound ON company_regions(company_id, city_id);

-- Cities
CREATE INDEX idx_cities_slug ON cities(slug);
CREATE INDEX idx_cities_state ON cities(state);
CREATE INDEX idx_cities_active ON cities(is_active) WHERE is_active = true;

-- Crane Types
CREATE INDEX idx_crane_types_slug ON crane_types(slug);

-- Leads
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);

-- Lead Companies
CREATE INDEX idx_lead_companies_lead ON lead_companies(lead_id);
CREATE INDEX idx_lead_companies_company ON lead_companies(company_id);

-- ============================================
-- ROW LEVEL SECURITY (Supabase)
-- ============================================

ALTER TABLE crane_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_cranes ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_companies ENABLE ROW LEVEL SECURITY;

-- Public read access für öffentliche Daten
CREATE POLICY "Public read crane_types" ON crane_types FOR SELECT USING (true);
CREATE POLICY "Public read cities" ON cities FOR SELECT USING (is_active = true);
CREATE POLICY "Public read companies" ON companies FOR SELECT USING (is_active = true);
CREATE POLICY "Public read company_cranes" ON company_cranes FOR SELECT USING (true);
CREATE POLICY "Public read company_regions" ON company_regions FOR SELECT USING (true);

-- Leads: nur Insert (kein Read für anon)
CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (dsgvo_consent = true);
-- lead_companies: no anon INSERT — only service_role inserts via API
-- CREATE POLICY "Public insert lead_companies" ON lead_companies FOR INSERT WITH CHECK (true);
