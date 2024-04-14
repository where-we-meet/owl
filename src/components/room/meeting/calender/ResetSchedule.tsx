import { useDeleteUserSchedule } from '@/hooks/useMutateUserData';
import { useQueryUser } from '@/hooks/useQueryUser';
import { Button } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { LuEraser } from 'react-icons/lu';

const ResetSchedule = () => {
  const { id: roomId }: { id: string } = useParams();
  const { id: userId } = useQueryUser();

  const { mutate, isSuccess } = useDeleteUserSchedule();

  const handleResetSchedule = () => {
    mutate({ roomId, userId });
  };

  return (
    <Button isIconOnly>
      <LuEraser style={{ cursor: 'pointer' }} onClick={handleResetSchedule} />
    </Button>
  );
};

export default ResetSchedule;
