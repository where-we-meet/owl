'use client';
import { insertRoomUser } from '@/api/room';
import { useGetRoomData } from '@/hooks/useGetRoomData';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

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
    <ul>
      {roomUsers.map((user) => {
        return (
          user.users && (
            <li key={user.id}>
              <figure>
                <div>{user.users.name}</div>
                <img src={`${user.users.profile_url}`} alt="기본이미지" width={100} height={70} />
              </figure>
              <p>{user.start_location}</p>
            </li>
          )
        );
      })}
    </ul>
  );
};

export default UserList;
