import { useSearchDataStore } from '@/store/placeStore';
import { useRoomUserDataStore } from '@/store/roomUserStore';
import LocationSwitch from './LocationSwitch';
import styles from './StartLocationBox.module.css';

const StartLocationBox = () => {
  const roomUser = useRoomUserDataStore((state) => state.roomUser);
  const address = useSearchDataStore((state) => state.address);

  const isPinned = !!roomUser?.start_location;

  return (
    <div className={styles.start_location_container}>
      <div className={styles.wrapper}>
        <div className={`${styles.box} ${isPinned && styles.selected}  `}>
          {isPinned ? roomUser.start_location : address}
        </div>
        <LocationSwitch toggleState={isPinned} />
      </div>
    </div>
  );
};

export default StartLocationBox;
