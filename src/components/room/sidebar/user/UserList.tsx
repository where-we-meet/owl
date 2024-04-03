'use client';
import { getRealtimeRoomData, getRoomUsersData, getCurrentUserData } from '@/api/supabase';
import { userDataFetch } from '@/utils/supabase/userDataFetch';
import { useEffect, useState } from 'react';

export type Users = Awaited<ReturnType<typeof getRoomUsersData>>;

const UserList = ({ id }: { id: string }) => {
  const [roomData, setRoomData] = useState<Users>([]);

  useEffect(() => {
    userDataFetch(id, setRoomData);
    // const userData = async () => {
    //   const { user } = await getCurrentUserData();
    //   const userRoomData = await getRoomUsersData(id);
    //   const currentUserId = user.id;

    //   const adminUser = userRoomData.filter((user) => user.is_admin);
    //   const currentUser = userRoomData.filter((user) => !user.is_admin && user.user_id === currentUserId);
    //   const otherUsers = userRoomData.filter((user) => !user.is_admin && user.user_id !== currentUserId);

    //   const sortedUsers = [...adminUser, ...currentUser, ...otherUsers];
    //   setRoomData(sortedUsers);
    // };
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
