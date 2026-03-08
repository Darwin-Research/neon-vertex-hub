
-- Add due_date and admin_notes columns to inquiries
ALTER TABLE public.inquiries
  ADD COLUMN due_date date DEFAULT (CURRENT_DATE + INTERVAL '7 days')::date,
  ADD COLUMN admin_notes text DEFAULT '';
