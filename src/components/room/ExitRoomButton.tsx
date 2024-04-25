import { getIsAdmin } from '@/api/room';
import { useDeleteExitUser, useDeleteRoom } from '@/hooks/useMutateUserData';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ImExit } from 'react-icons/im';

export const ExitRoomButton = ({ roomId }: { roomId: string }) => {
  const { id: userId } = useQueryUser();
  const router = useRouter();
  const { mutateAsync: deleteExitUser } = useDeleteExitUser(roomId);
  const { mutateAsync: deleteRoom } = useDeleteRoom();

  const { data: room, isPending } = useQuery({
    queryKey: ['room', 'confirmed', 'createdBy'],
    queryFn: () => getIsAdmin(roomId, userId),
    select: (data) => data[0]
  });

  const handleDeleteUser = () => {
    if (room?.created_by !== userId) {
      deleteExitUser({ roomId, userId });
      router.push('/');
    } else {
      confirm('정말 나가시겠어요? 방장이 나가면 이 모임방은 삭제됩니다.');
      deleteRoom({ roomId, userId });
      router.push('/');
    }
  };
  return (
    <>
      <button onClick={handleDeleteUser}>
        <ImExit />
      </button>
    </>
  );
};
