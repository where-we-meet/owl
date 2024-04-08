import { getCurrentUserData } from '@/api/supabaseCSR/supabase';
import { useCurrentUser } from '@/store/userStore';
import { useEffect } from 'react';

export const useSession = () => {
  const currentUser = useCurrentUser((state) => state.currentUser);
  const setCurrentUser = useCurrentUser((state) => state.setCurrentUser);

  useEffect(() => {
    const getSession = async () => {
      const { user } = await getCurrentUserData();
      setCurrentUser(user);
    };
    getSession();
  }, []);

  return { currentUser };
};
