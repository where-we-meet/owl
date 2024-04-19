import { Avatar } from '@nextui-org/avatar';

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
  const userInfo = {
    name: user.users?.name || '올빼미',
    avatar: user.users?.profile_url,
    startLocation: user.start_location
  };

  return (
    <div>
      <div>
        <div>{userInfo.name}</div>
        <div>{userInfo.startLocation}</div>
      </div>
      <Avatar isBordered src={`${userInfo.avatar}`} showFallback name={userInfo.name} />
    </div>
  );
};

export default UserCard;
