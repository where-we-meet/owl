'use client';
import { Suspense } from 'react';
import { ListMessage } from './ListMessage';
import { InitMessages } from './InitMessages';
import { createClient } from '@/utils/supabase/client';

export const ChatMessage = async () => {
  const supabase = createClient();

  const { data } = await supabase.from('message').select('*, users(*)');

  console.log(data);
  return (
    <Suspense fallback={'loading..'}>
      <ListMessage />
      <InitMessages messages={data || []} />
    </Suspense>
  );
};
