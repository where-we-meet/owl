'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const supabase = createClient();
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return <button onClick={signOut}>로그아웃</button>;
};

export default Logout;
