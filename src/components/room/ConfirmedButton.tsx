'use client';
import { mostSchedule } from '@/utils/mostSchedule';
import { useParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useQuery } from '@tanstack/react-query';
import { getRoomIsConfirmed } from '@/api/room';
import { useHalfwayDataStore } from '@/store/halfwayStore';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useQuerySchedule } from '@/hooks/useQuerySchedule';
import styles from './ConfirmedButton.module.css';
import { useRouter } from 'next/navigation';
import { RoomUserDate, useRoomUserData } from '@/hooks/useMutateUserData';

const ConfirmedButton = () => {
  const router = useRouter();
  const { id: roomId }: { id: string } = useParams();
  const { id: userId } = useQueryUser();
  const { data: userSchedules } = useQuerySchedule({ roomId, userId });
  const { maxDates } = mostSchedule(userSchedules);
  const { lat, lng, location } = useHalfwayDataStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: room, isPending } = useQuery({
    queryKey: ['room', 'confirmed', 'createdBy'],
    queryFn: () => getRoomIsConfirmed(roomId),
    select: (data) => data[0]
  });

  const { mutateAsync, isSuccess } = useRoomUserData();
  const [isFetchDone, setIsFetchDone] = useState(false);

  const handleConfirm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lat || !lng) return;
    const confirmed_date = e.currentTarget.date.value;

    const roomUsersData: { roomId: string; updated: RoomUserDate } = {
      roomId: roomId,
      updated: {
        lat: String(lat),
        lng: String(lng),
        location,
        verified: true,
        confirmed_date
      }
    };

    await mutateAsync(roomUsersData);
    setIsFetchDone(true);
    router.push(`/room/${roomId}/confirm`);
  };

  if (!room || isPending) return null;
  if (room.created_by !== userId) return null;

  return (
    <>
      <Button onPress={onOpen} isDisabled={isFetchDone}>
        {isFetchDone ? '모임 확정 완료' : '확정'}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">모임 일정, 장소를 확정해주세요</ModalHeader>
              <form onSubmit={handleConfirm}>
                <ModalBody>
                  <div className={styles.date}>
                    {maxDates.map((date, i) => (
                      <label key={i}>
                        <input type="radio" name="date" value={date} />
                        {date}
                      </label>
                    ))}
                  </div>
                  <p>{location}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    취소
                  </Button>
                  <Button type="submit" color="primary" onPress={onClose}>
                    확정
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmedButton;
