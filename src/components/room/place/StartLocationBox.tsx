import LocationSwitch from './LocationSwitch';
import { useSearchDataStore } from '@/store/placeStore';
import { useQueryRoomUsers } from '@/hooks/useQueryRoomUsers';
import styles from './StartLocationBox.module.css';

const StartLocationBox = () => {
  const {
    currentUser: [user]
  } = useQueryRoomUsers();
  const address = useSearchDataStore((state) => state.address);

  const isPinned = !!user?.start_location;

  return (
    <div className={styles.start_location_container}>
      <div className={styles.wrapper}>
        <div className={`${styles.box} ${isPinned && styles.selected}  `}>
          {isPinned ? user.start_location : address}
        </div>
        <LocationSwitch toggleState={isPinned} />
      </div>
    </div>
  );
};

export default StartLocationBox;
