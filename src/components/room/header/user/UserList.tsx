import { Avatar, AvatarGroup, Tooltip } from '@nextui-org/react';
import styles from './UserList.module.css';
import type { RoomUser } from '@/types/roomUser';

const UserList = ({ roomUsers }: { roomUsers: RoomUser[] }) => {
  return (
    <AvatarGroup max={5} className={styles.user_list}>
      {roomUsers.map((user) => {
        return (
          user.users && (
            <Tooltip key={user.id} showArrow={false} content={user.start_location} placement="bottom-end">
              <Avatar isBordered src={`${user.users.profile_url}`} showFallback name={user.users.name} />
            </Tooltip>
          )
        );
      })}
    </AvatarGroup>
  );
};

export default UserList;
