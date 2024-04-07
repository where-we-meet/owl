import StartMeeting from '@/components/room/StartMeeting';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <>
      <p>Hello {user?.email}</p>
      <StartMeeting user={user} />
    </>
  );
}
