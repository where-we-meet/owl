import { getUsersData } from '@/api/supabaseCSR/supabase';
import { useQuery } from '@tanstack/react-query';

export const useQueryUsersData = (userId: string) => {
  const { data = [], isPending } = useQuery({ queryKey: ['usersTableData'], queryFn: () => getUsersData(userId) });
  return { data, isPending };
};
