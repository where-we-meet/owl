import { Suspense } from 'react';
import { ListMessage } from './ListMessage';

export const ChatMessage = ({ roomId }: { roomId: string }) => {
  return (
    <Suspense fallback={'loading..'}>
      <ListMessage roomId={roomId} />
    </Suspense>
  );
};
