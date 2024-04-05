'use client';
import { RoomUser } from '@/types/roomUser';

const UserList = ({ roomUsers }: { roomUsers: RoomUser[] }) => {
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
