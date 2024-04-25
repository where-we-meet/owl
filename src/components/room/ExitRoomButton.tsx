import { getIsAdmin } from '@/api/room';
import { useDeleteExitUser, useDeleteRoom } from '@/hooks/useMutateUserData';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ImExit } from 'react-icons/im';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import styles from './ExitRoomButton.module.css';

export const ExitRoomButton = ({ roomId }: { roomId: string }) => {
  const { id: userId } = useQueryUser();
  const router = useRouter();
  const { mutateAsync: deleteExitUser } = useDeleteExitUser(roomId);
  const { mutateAsync: deleteRoom } = useDeleteRoom();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { data: room, isPending } = useQuery({
    queryKey: ['room', 'confirmed', 'createdBy'],
    queryFn: () => getIsAdmin(roomId, userId),
    select: (data) => data[0]
  });

  const handleDeleteUser = async () => {
    if (room?.created_by !== userId) {
      deleteExitUser({ roomId, userId });
      router.push('/');
    } else {
      deleteRoom({ roomId, userId });
      router.push('/');
    }
  };

  return (
    <>
      <Button size="sm" onPress={onOpen} variant="light" className={styles.exit_button}>
        <ImExit />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>확인</ModalHeader>
              <ModalBody>
                {room?.created_by !== userId
                  ? '정말 나가시겠어요? 선택한 일정과 출발 위치가 삭제됩니다.'
                  : '정말 나가시겠어요? 방장이 나가면 이 모임방은 삭제됩니다.'}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  취소
                </Button>
                <Button type="submit" color="primary" onPress={handleDeleteUser}>
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
