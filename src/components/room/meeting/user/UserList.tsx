'use client';
import { getRoomData, getUserSchedule, getUserSession } from '@/api/supabase';
import { useEffect } from 'react';

const UserList = () => {
  useEffect(() => {
    const userData = async () => {
      const data = await getUserSession();
      const userSchedule = await getUserSchedule();
      console.log('currentUser :', data, 'roomsData123 : ', userSchedule);
    };

    userData();
  }, []);

  return (
    <>
      <section>
        <h2>방 제목</h2>
        <button>수정하기</button>
        <div>
          <button>공유하기</button>
        </div>
      </section>
      <section>
        <div>
          <li>유저1</li>
        </div>
      </section>
    </>
  );
};

export default UserList;
