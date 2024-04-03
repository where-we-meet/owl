'use client';
import { getRoomUsersData, getUserData } from '@/api/supabase';
import { useEffect, useState } from 'react';

type Users = Awaited<ReturnType<typeof getRoomUsersData>>;

const UserList = ({ id }: { id: string }) => {
  const [users, setUsers] = useState<Users>([]);

  useEffect(() => {
    const userData = async () => {
      const { user } = await getUserData();
      const userRoomData = await getRoomUsersData(id);
      const currentUserId = user.id;

      const adminUser = userRoomData.filter((user) => user.is_admin);
      const currentUser = userRoomData.filter((user) => !user.is_admin && user.user_id === currentUserId);
      const otherUsers = userRoomData.filter((user) => !user.is_admin && user.user_id !== currentUserId);

      const sortedUsers = [...adminUser, ...currentUser, ...otherUsers];
      setUsers(sortedUsers);
    };
    userData();
  }, [id]);

  return (
    <section>
      <ul>
        {users.map((user) => {
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
