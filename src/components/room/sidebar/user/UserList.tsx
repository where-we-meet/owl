'use client';
import { getRoomUsersData, getUserSession } from '@/api/supabase';
import { Tables } from '@/types/supabase';
import { useEffect, useState } from 'react';

type User = Tables<'userdata_room'>;

const UserList = ({ id }: { id: string }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const userData = async () => {
      const data = await getUserSession();
      const userRoomData = await getRoomUsersData(id);
      console.log('currentUser :', data, 'userRoomData : ', userRoomData);

      setUsers(userRoomData);
    };
    userData();
  }, [id]);

  return (
    <section>
      <ul>
        {users.map((user) => {
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
