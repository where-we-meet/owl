import { getCurrentUserData } from '@/api/supabaseCSR/supabase';
import { useCurrentUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';

export const useSession = () => {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);

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
