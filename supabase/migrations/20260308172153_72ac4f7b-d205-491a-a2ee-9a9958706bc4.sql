
-- Add status column to inquiries for kanban tracking
ALTER TABLE public.inquiries 
  ADD COLUMN status text NOT NULL DEFAULT 'new';

-- Allow admins to update inquiries (for changing status)
CREATE POLICY "Admins can update inquiries"
  ON public.inquiries FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete inquiries
CREATE POLICY "Admins can delete inquiries"
  ON public.inquiries FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
