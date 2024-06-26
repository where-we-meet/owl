'use client';

import { mostSchedule } from '@/utils/mostSchedule';
import { useParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRoomIsConfirmed } from '@/api/room';
import { useHalfwayDataStore } from '@/store/halfwayStore';
import { useQuerySchedule } from '@/hooks/useQuerySchedule';
import { RoomUserDate, useRoomUserData } from '@/hooks/useMutateUserData';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure
} from '@nextui-org/react';
import styles from './ConfirmedButton.module.css';

const ConfirmedButton = () => {
  const queryClient = useQueryClient();
  const { id: roomId }: { id: string } = useParams();
  const { id: userId } = useQueryUser();
  const { data: userSchedules } = useQuerySchedule({ roomId, userId });
  const { maxDates } = mostSchedule(userSchedules);
  const {
    halfwayPoint: { lat, lng },
    address: location
  } = useHalfwayDataStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: room, isPending } = useQuery({
    queryKey: ['is-confirmed-room', roomId],
    queryFn: () => getRoomIsConfirmed(roomId)
  });

  const { mutateAsync } = useRoomUserData();
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

    queryClient.invalidateQueries({
      queryKey: ['room', 'confirmed', 'createdBy']
    });

    setIsFetchDone(true);
  };

  if (!room || isPending) return null;
  if (room.created_by !== userId) return null;

  return (
    <>
      <Tooltip color="foreground" placement="right-end" content="일정을 확정하기">
        <Button onPress={onOpen} isDisabled={isFetchDone} fullWidth={true} color="primary">
          {isFetchDone ? '모임 확정 완료' : '확정'}
        </Button>
      </Tooltip>
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
