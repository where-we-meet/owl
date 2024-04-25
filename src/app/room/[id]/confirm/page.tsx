import ResultMap from '@/components/room/place/ResultMap';
import ResultHeader from '@/components/room/header/ResultHeader';
import { ChatRoom } from '@/components/room/chatRoom/ChatRoom';
import styles from './page.module.css';
import CategorySelector from '@/components/room/place/search/CategorySelector';

const RoomPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <ResultHeader roomId={params.id} />
        <CategorySelector />
      </div>
      <ResultMap />
      <ChatRoom roomId={params.id} />
    </div>
  );
};

export default RoomPage;
