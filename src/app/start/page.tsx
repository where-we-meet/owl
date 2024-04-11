import StartMeeting from '@/components/room/StartMeeting';
import { createClient } from '@/utils/supabase/server';

const page = async () => {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <StartMeeting user={user} />;
};

export default page;
