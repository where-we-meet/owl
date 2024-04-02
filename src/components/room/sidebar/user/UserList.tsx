'use client';
import { getRoomUsersData, getUserSession, getUsersData } from '@/api/supabase';
import { Tables } from '@/types/supabase';
import { useEffect, useState } from 'react';

type UserInfo = {
  name: string;
  profile_url: string | null;
};

type User = Tables<'userdata_room'> & {
  users: UserInfo;
};

const UserList = ({ id }: { id: string }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const userData = async () => {
      const data = await getUserSession();
      const userRoomData = await getRoomUsersData(id);
      console.log('currentUser :', data, 'userRoomData : ', userRoomData);
      setUsers(userRoomData as []);
    };
    userData();
  }, [id]);

  return (
    <section>
      <ul>
        {users.map((user) => {
          if (user.is_admin) {
            return (
              <div key={user.id}>
                <figure>
                  <p>{user.users.name}</p>
                  <img src={`${user.users.profile_url}`} width={100} height={70} alt="프로필사진" />
                </figure>
                <div>{user.start_location}</div>
              </div>
            );
          }
          return (
            <>
              <li key={user.id}>
                <div></div>
              </li>
            </>
          );
        })}
      </ul>
    </section>
  );
};

export default UserList;
