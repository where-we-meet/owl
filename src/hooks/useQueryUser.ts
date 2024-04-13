import { User } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';

export const useQueryUser = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(['auth']) as User;
};
