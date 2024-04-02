'use client';
import { getRoomUsersData, getUserData } from '@/api/supabase';
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
      const { user } = await getUserData();
      const userRoomData = await getRoomUsersData(id);
      const currentUserId = user.id;

      const adminUser = userRoomData.filter((user) => user.is_admin);
      const currentUser = userRoomData.filter((user) => !user.is_admin && user.user_id === currentUserId);
      const otherUsers = userRoomData.filter((user) => !user.is_admin && user.user_id !== currentUserId);

      const sortedUsers = [...adminUser, ...currentUser, ...otherUsers];

      setUsers(sortedUsers as []);
    };
    userData();
  }, [id]);

  return (
    <section>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <figure>
                <div>{user.users.name}</div>
                <img src={`${user.users.profile_url}`} alt="디폴트이미지" width={100} height={70} />
              </figure>
              <p>{user.start_location}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default UserList;
