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
      <div className={styles.label}>
        {' '}
        {isPinned ? '출발 위치가 확정되었습니다.' : '핀을 클릭하여 출발 위치를 확정해주세요.'}
      </div>
      <div className={styles.wrapper}>
        <div className={`${styles.box} ${isPinned && styles.selected}  `}>{address}</div>
        <LocationSwitch toggleState={isPinned} />
      </div>
    </div>
  );
};

export default StartLocationBox;
