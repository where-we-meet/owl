import ResultMap from '@/components/room/place/ResultMap';
import ResultHeader from '@/components/room/header/ResultHeader';
import styles from './page.module.css';
import { ChatRoom } from '@/components/room/chatRoom/ChatRoom';

const RoomPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className={styles.container}>
      <ResultHeader roomId={params.id} />
      <ResultMap roomId={params.id} />
      <ChatRoom roomId={params.id} />
    </div>
  );
};

export default RoomPage;
