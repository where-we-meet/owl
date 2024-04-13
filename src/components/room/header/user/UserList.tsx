'use client';
import { insertRoomUser } from '@/api/room';
import { useGetRoomData } from '@/hooks/useGetRoomData';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import styles from './UserList.module.css';
import { Avatar, Tooltip } from '@nextui-org/react';

const UserList = () => {
  const { id: userId } = useQueryUser();
  const { id: roomId }: { id: string } = useParams();
  const { roomUsers } = useGetRoomData(roomId, userId);

  const joinNewUser = async () => {
    const isExistUser = roomUsers.some((user) => user.user_id === userId);
    if (isExistUser) return;
    await insertRoomUser({ room_id: roomId, user_id: userId, is_admin: false });
  };

  useEffect(() => {
    if (roomUsers.length > 0) {
      joinNewUser();
    }
  }, [roomUsers.length]);

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
