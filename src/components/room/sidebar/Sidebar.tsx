import { Link, Tooltip } from '@nextui-org/react';
import Calender from '../calender/Calender';
import RoomHeader from '../header/RoomHeader';
import UserList from './user/UserList';
import LinkShare from '../share/LinkShare';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useQueryRoomUsers } from '@/hooks/useQueryRoomUsers';
import { useParams } from 'next/navigation';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ExitRoomButton } from '../ExitRoomButton';
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
          <Tooltip color="foreground" placement="right-end" content="방 나가기">
            <p className={styles.exit}>
              <ExitRoomButton roomId={roomId} />
            </p>
          </Tooltip>

          {/* <p className={styles.participants}>
            <IoMdPerson />
            {participantNumber}
          </p> */}
        </div>

        <RoomHeader />
        <Calender />
        <p className={styles.select_date}>
          <FaRegCheckCircle /> 가능한 일자를 달력에서 선택해주세요.
        </p>
        <LinkShare />
        <UserList />
      </div>
    </>
  );
};

export default Sidebar;
