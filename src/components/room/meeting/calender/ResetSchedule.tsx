import { useDeleteUserSchedule } from '@/hooks/useMutateUserData';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useParams } from 'next/navigation';
import { LuEraser } from 'react-icons/lu';

const ResetSchedule = () => {
  const { id: roomId }: { id: string } = useParams();
  const { id: userId } = useQueryUser();

  const { mutate, isSuccess } = useDeleteUserSchedule();

  const handleResetSchedule = () => {
    mutate({ roomId, userId });
  };

  return <LuEraser style={{ cursor: 'pointer' }} onClick={handleResetSchedule} />;
};

export default ResetSchedule;
