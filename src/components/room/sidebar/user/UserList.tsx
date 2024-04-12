'use client';
import { insertRoomUser } from '@/api/room';
import { useGetRoomData } from '@/hooks/useGetRoomData';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const UserList = () => {
  const user = useQueryUser();
  const { id: roomId }: { id: string } = useParams();
  const { roomUsers, isLoading } = useGetRoomData(roomId, user.id);

  useEffect(() => {
    const joinNewUser = async () => {
      const isNewUser = !roomUsers.some((user) => user.user_id === user.id);
      if (isNewUser) return;
      await insertRoomUser({ room_id: roomId, user_id: user.id, is_admin: false });
    };

    if (!isLoading && roomUsers.length > 0) {
      joinNewUser();
    }
  }, [roomUsers]);

  return (
    <section>
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
    </section>
  );
};

export default UserList;
