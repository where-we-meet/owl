import ResultHeader from '@/components/room/header/ResultHeader';
import ResultMap from '@/components/room/place/ResultMap';
import CategorySelector from '@/components/room/place/search/CategorySelector';
import RangeController from '@/components/room/place/RangeController';
import { ChatRoom } from '@/components/room/chatRoom/ChatRoom';
import styles from './page.module.css';

const RoomPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <ResultHeader />
        <CategorySelector />
      </div>
      <ResultMap />
      <RangeController />
      <ChatRoom roomId={params.id} />
    </div>
  );
};

export default RoomPage;
