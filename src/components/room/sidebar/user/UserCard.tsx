import { useQueryUser } from '@/hooks/useQueryUser';
import { Avatar } from '@nextui-org/avatar';
import { useSearchDataStore } from '@/store/placeStore';
import { Tooltip } from '@nextui-org/react';
import type { RoomUser } from '@/types/roomUser';
import styles from './UserCard.module.css';

const UserCard = ({ user }: { user: RoomUser }) => {
  const { id: userId } = useQueryUser();
  const setLocation = useSearchDataStore((state) => state.setLocation);

  const userInfo = {
    name: user.name || '올빼미',
    avatar: user.profile_url,
    startLocation: user.start_location
  };

  const isCurrentUser = user.user_id === userId;

  const handleClickUser = (user: RoomUser) => {
    if (!user.lat || !user.lng) return;
    setLocation({ lat: +user.lat, lng: +user.lng });
  };

  return (
    <Tooltip
      placement="bottom-end"
      color="secondary"
      content="친구들의 위치를 확인하기"
      isDisabled={!user.lat || !user.lng}
    >
      <li
        className={`${styles.usercard} ${isCurrentUser ? styles.currentuser : ''}`}
        onClick={() => handleClickUser(user)}
      >
        <div className={styles.avatar_container}>
          <Avatar isBordered src={`${userInfo.avatar}`} showFallback name={userInfo.name} />
        </div>
        <div className={styles.userdata_container}>
          <p className={styles.username}>{userInfo.name}</p>
          <p className={styles.user_address}>
            {userInfo.startLocation ? userInfo.startLocation : '확정된 출발 위치를 보여줍니다.'}
          </p>
        </div>
      </li>
    </Tooltip>
  );
};

export default UserCard;
