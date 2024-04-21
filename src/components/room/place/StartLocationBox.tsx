import { useSearchDataStore } from '@/store/placeStore';
import { useRoomUserDataStore } from '@/store/roomUserStore';
import LocationSwitch from './LocationSwitch';
import styles from './StartLocationBox.module.css';

const StartLocationBox = () => {
  const roomUser = useRoomUserDataStore((state) => state.roomUser);
  const address = useSearchDataStore((state) => state.address);

  const isPinned = !!roomUser?.start_location;

  return (
    <div>
      <div className={styles.label}>출발 위치</div>
      <div className={styles.wrapper}>
        <div className={`${styles.box} ${isPinned && styles.selected}  `}>{address}</div>
        <LocationSwitch toggleState={isPinned} />
      </div>
    </div>
  );
};

export default StartLocationBox;
