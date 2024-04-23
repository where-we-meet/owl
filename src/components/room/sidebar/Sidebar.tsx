import { Link } from '@nextui-org/react';
import Calender from '../calender/Calender';
import RoomHeader from '../header/RoomHeader';
import UserList from './user/UserList';
import LinkShare from '../share/LinkShare';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useQueryRoomUsers } from '@/hooks/useQueryRoomUsers';
import { useParams } from 'next/navigation';
import { IoMdPerson } from 'react-icons/io';
import { FaRegCheckCircle } from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { id: roomId }: { id: string } = useParams();
  const { id: userId } = useQueryUser();
  const { roomUsers, isPending } = useQueryRoomUsers(roomId, userId);

  const participantNumber = roomUsers.length;

  return (
    <>
      <div className={styles.room}>
        <div className={styles.wrap}>
          <Link className={styles.brand} color="foreground" href="/">
            OWL-LiNK
          </Link>

          <p className={styles.participants}>
            <IoMdPerson />
            {participantNumber}
          </p>
        </div>

        <RoomHeader />
        <Calender />
        <p className={styles.select_date}>
          <FaRegCheckCircle /> 참석 가능한 날짜를 선택해주세요.
        </p>
        <LinkShare />
        <UserList />
      </div>
    </>
  );
};

export default Sidebar;
