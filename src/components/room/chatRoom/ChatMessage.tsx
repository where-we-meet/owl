'use client';
import { Suspense } from 'react';
import { ListMessage } from './ListMessage';
import { InitMessages } from './InitMessages';
import { createClient } from '@/utils/supabase/client';
import { getMessageData } from '@/api/supabaseCSR/supabase';
import { useQueryUser } from '@/hooks/useQueryUser';

export const ChatMessage = async () => {
  const supabase = createClient();
  const user = useQueryUser();
  const data = await getMessageData(user.id);

  console.log(data);
  return (
    <Suspense fallback={'loading..'}>
      <ListMessage />
      <InitMessages messages={data || []} />
    </Suspense>
  );
};
