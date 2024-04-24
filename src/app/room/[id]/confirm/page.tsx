import ResultMap from '@/components/room/place/ResultMap';
import ResultHeader from '@/components/room/header/ResultHeader';
import { ChatRoom } from '@/components/room/chatRoom/ChatRoom';
import styles from './page.module.css';

const RoomPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className={styles.container}>
      <ResultHeader roomId={params.id} />
      <ResultMap />
      <ChatRoom roomId={params.id} />
    </div>
  );
};

export default RoomPage;
