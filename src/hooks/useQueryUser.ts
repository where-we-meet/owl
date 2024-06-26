import { getSession } from '@/api/auth/getSession';
import { createClient } from '@/utils/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { User } from '@supabase/supabase-js';

export const useQueryUser = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ['auth'],
    queryFn: () => getSession(supabase),
    initialData: queryClient.getQueryData(['auth']) as User
  });
  return user;
};
