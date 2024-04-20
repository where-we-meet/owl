import { useQueryUser } from '@/hooks/useQueryUser';
import { Avatar } from '@nextui-org/avatar';
import styles from './UserCard.module.css';

type User = {
  created_at: string;
  id: string;
  is_admin: boolean;
  lat: string | null;
  lng: string | null;
  room_id: string;
  start_location: string | null;
  user_id: string;
  users: {
    profile_url: string | null;
    name: string;
  } | null;
};

const UserCard = ({ user }: { user: User }) => {
  const { id: userId } = useQueryUser();
  const userInfo = {
    name: user.users?.name || '올빼미',
    avatar: user.users?.profile_url,
    startLocation: user.start_location
  };

  const isCurrentUser = user.user_id === userId;

  return (
    <div>
      <div className={isCurrentUser ? styles.usercard_container : styles.mycard_container}>
        <div className={styles.avatar_container}>
          <Avatar isBordered src={`${userInfo.avatar}`} showFallback name={userInfo.name} />
        </div>
        <div className={styles.userdata_container}>
          <p className={styles.username}>{userInfo.name}</p>
          <p className={styles.user_address}>
            {userInfo.startLocation ? userInfo.startLocation : '출발 위치를 설정해주세요.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
