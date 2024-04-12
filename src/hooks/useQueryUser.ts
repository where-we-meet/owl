import { getSession } from '@/api/auth';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useQueryUser = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['auth'],
    queryFn: () => getSession(supabase),
    initialData: queryClient.getQueryData(['auth']) as User
  });
};
