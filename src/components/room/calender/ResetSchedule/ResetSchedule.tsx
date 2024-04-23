import { useDeleteUserSchedule } from '@/hooks/useMutateUserData';
import { useQueryUser } from '@/hooks/useQueryUser';
import { Button } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { LuEraser } from 'react-icons/lu';

const ResetSchedule = () => {
  const { id: roomId }: { id: string } = useParams();
  const { id: userId } = useQueryUser();

  const { mutateAsync, isSuccess } = useDeleteUserSchedule(roomId);

  const handleResetSchedule = () => {
    mutateAsync({ roomId, userId });
  };

  return (
    <Button isIconOnly>
      <LuEraser title="선택된 날짜를 초기화한다올" style={{ cursor: 'pointer' }} onClick={handleResetSchedule} />
    </Button>
  );
};

export default ResetSchedule;
