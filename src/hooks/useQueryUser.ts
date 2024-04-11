import { getSession } from '@/api/auth';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const useQueryUser = () => {
  const supabase = createClient();
  return useQuery({ queryKey: ['auth'], queryFn: () => getSession(supabase) });
};
