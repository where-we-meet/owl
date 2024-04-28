import { useDeleteUserSchedule } from '@/hooks/useMutateUserData';
import { useQueryUser } from '@/hooks/useQueryUser';
import { Button, Tooltip } from '@nextui-org/react';
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
    <Tooltip color="secondary" placement="right" content="선택된 일정을 초기화하기">
      <Button color="primary" style={{ cursor: 'pointer' }} onClick={handleResetSchedule}>
        초기화
      </Button>
    </Tooltip>
  );
};

export default ResetSchedule;
