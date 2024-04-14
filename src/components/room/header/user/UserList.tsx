import { Avatar, Tooltip } from '@nextui-org/react';
import styles from './UserList.module.css';
import type { RoomUser } from '@/types/roomUser';

const UserList = ({ roomUsers }: { roomUsers: RoomUser[] }) => {
  return (
    <ul className={styles.user_list}>
      {roomUsers.map((user) => {
        return (
          user.users && (
            <li key={user.id}>
              <Tooltip showArrow={true} content={user.start_location} placement="bottom">
                <Avatar isBordered src={`${user.users.profile_url}`} showFallback name={user.users.name} />
              </Tooltip>
            </li>
          )
        );
      })}
    </ul>
  );
};

export default UserList;
