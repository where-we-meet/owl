import { useQueryMyRooms } from '@/hooks/useQueryMyRooms';
import { useRouter } from 'next/navigation';
import styles from './MyRooms.module.css';

const MyRooms = () => {
  const router = useRouter();
  const { myRooms, isPending } = useQueryMyRooms();

  const handleClickRoom = (roomId: string) => {
    router.push(`/room/${roomId}`);
  };

  return (
    <ul className={styles.rooms}>
      {myRooms.map((room) => (
        <li key={room.id} className={styles.room} onClick={() => handleClickRoom(room.id)}>
          {room.name[0]}
        </li>
      ))}
    </ul>
  );
};

export default MyRooms;
