-- Migration: 001_create_contact_leads.sql
-- Run this in: Supabase Dashboard → SQL Editor → New Query

-- ── Table ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_leads (
  id                  TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name                TEXT        NOT NULL,
  email               TEXT        NOT NULL,
  phone               TEXT,
  service_type        TEXT        NOT NULL
                      CHECK (service_type IN ('basic','standard','premium','custom')),
  budget              TEXT,
  message             TEXT        NOT NULL,
  status              TEXT        NOT NULL DEFAULT 'new'
                      CHECK (status IN ('new','contacted','closed','rejected')),
  notification_status TEXT        NOT NULL DEFAULT 'pending'
                      CHECK (notification_status IN ('pending','sent','failed')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Auto-update updated_at ─────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON contact_leads;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON contact_leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── Row Level Security ─────────────────────────────────────────────────────────
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

-- Public: allow inserting new leads (contact form — anon key)
CREATE POLICY "anon_insert_leads"
  ON contact_leads FOR INSERT TO anon
  WITH CHECK (true);

-- Public: allow reading leads list (admin panel — anon key, secure with auth later)
-- TODO: replace anon with authenticated role once Supabase Auth is added
CREATE POLICY "anon_read_leads"
  ON contact_leads FOR SELECT TO anon
  USING (true);

-- Public: allow status updates (mark lead as contacted/closed from admin)
CREATE POLICY "anon_update_leads"
  ON contact_leads FOR UPDATE TO anon
  USING (true);

-- Public: allow deleting leads
CREATE POLICY "anon_delete_leads"
  ON contact_leads FOR DELETE TO anon
  USING (true);

-- ── Indexes ────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_contact_leads_status     ON contact_leads(status);
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON contact_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_leads_email      ON contact_leads(email);
