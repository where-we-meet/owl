import { MeetingInfo, useQueryMyRooms } from '@/hooks/useQueryMyRooms';
import { useRouter } from 'next/navigation';
import { BsPlusSquareDotted } from 'react-icons/bs';
import { Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import styles from './MyRooms.module.css';

const MyRooms = () => {
  const router = useRouter();
  const { myRooms, isPending } = useQueryMyRooms();

  const handleClickRoom = (roomId: string | null, room: MeetingInfo) => {
    room.verified ? router.push(`/room/${roomId}/confirm`) : router.push(`/room/${roomId}`);
  };

  return (
    <>
      <ul className={styles.rooms}>
        {myRooms.map((room) => (
          <Tooltip key={room.id} color="foreground" placement="right" content={room.name}>
            <li className={styles.room} onClick={() => handleClickRoom(room.id, room)}>
              {room.name?.substring(0, 1)}
            </li>
          </Tooltip>
        ))}
        <li className={styles.new_room}>
          <Tooltip color="secondary" placement="bottom-end" content="새로운 모임방을 만들기">
            <Link href="/start">
              <BsPlusSquareDotted size="100%" />
            </Link>
          </Tooltip>
        </li>
      </ul>
    </>
  );
};

export default MyRooms;
