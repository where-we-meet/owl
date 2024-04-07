'use client';
import { useRoomUserDataStore } from '@/store/store';

const UserList = () => {
  const roomUsers = useRoomUserDataStore((state) => state.roomUsers);
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
