'use client';
import { getRealtimeRoomData, getRoomUsersData } from '@/api/supabase';
import { userDataFetch } from '@/utils/supabase/userDataFetch';
import { useEffect, useState } from 'react';

export type RoomData = Awaited<ReturnType<typeof getRoomUsersData>>;

const UserList = ({ id }: { id: string }) => {
  const [roomData, setRoomData] = useState<RoomData>([]);

  useEffect(() => {
    userDataFetch(id, setRoomData);
    getRealtimeRoomData(id, setRoomData);
    console.log('실행됨?', getRealtimeRoomData(id, setRoomData));
  }, [id]);

  return (
    <section>
      <ul>
        {roomData.map((user) => {
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
