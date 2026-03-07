
-- Add unique constraint on (user_id, date) for upsert support
ALTER TABLE public.daily_progress ADD CONSTRAINT daily_progress_user_date_unique UNIQUE (user_id, date);

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_daily_progress_updated_at
  BEFORE UPDATE ON public.daily_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
