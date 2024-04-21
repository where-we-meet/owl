import { ChatMessage } from './ChatMessage';
import { InputBox } from './InputBox';

export const ChatRoom = () => {
  return (
    <main>
      <ChatMessage />
      <div>
        <InputBox />
      </div>
    </main>
  );
};
