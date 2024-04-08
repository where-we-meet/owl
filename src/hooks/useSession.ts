import { getCurrentUserData } from '@/api/supabaseCSR/supabase';
import { useCurrentUser } from '@/store/userStore';
import { useEffect, useState } from 'react';

export const useSession = () => {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const currentUser = useCurrentUser((state) => state.currentUser);
  const setCurrentUser = useCurrentUser((state) => state.setCurrentUser);

  useEffect(() => {
    const getSession = async () => {
      const { user } = await getCurrentUserData();
      setCurrentUser(user);
    };

    if (!currentUser) {
      getSession();
    }

    setIsLoadingUser(false);
  }, []);

  return { isLoadingUser, currentUser };
};
