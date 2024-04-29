
import { getUserProfileData } from '@/api/profile';
import { useQuery } from '@tanstack/react-query';

export const useQueryProfile = (userId: string) => {
  const { data , isPending } = useQuery({ queryKey: ['usersTableData'], queryFn: () => getUserProfileData(userId) });
  return { data, isPending };
};
