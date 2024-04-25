import { useDeleteExitUser } from '@/hooks/useMutateUserData';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useRouter } from 'next/navigation';
import { ImExit } from 'react-icons/im';

export const ExitRoomButton = ({ roomId }: { roomId: string }) => {
  const { id: userId } = useQueryUser();
  const router = useRouter();
  const { mutateAsync, isSuccess } = useDeleteExitUser(roomId);

  const handleDeleteUser = () => {
    mutateAsync({ roomId, userId });
    router.push('/');
  };
  return (
    <>
      <button onClick={handleDeleteUser}>
        <ImExit />
      </button>
    </>
  );
};
