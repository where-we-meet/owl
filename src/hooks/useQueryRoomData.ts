import { getRoomData } from '@/api/supabaseCSR/supabase';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useQueryRoomData = () => {
  const { id: roomId }: { id: string } = useParams();
  const { data } = useQuery({ queryKey: ['room', roomId], queryFn: () => getRoomData(roomId) });
  return { data };
};
