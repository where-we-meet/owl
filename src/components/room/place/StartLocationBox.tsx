import { useSearchDataStore } from '@/store/placeStore';
import { useRoomUserDataStore } from '@/store/roomUserStore';
import LocationSwitch from './LocationSwitch';
import styles from './StartLocationBox.module.css';
import { useEffect, useRef, useState } from 'react';

const StartLocationBox = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(true);

  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setIsDialogVisible(false);
      }
    };
    if (isDialogVisible) {
      document.addEventListener('click', handleClickOutside);
    }
  }, [isDialogVisible]);

  const roomUser = useRoomUserDataStore((state) => state.roomUser);
  const address = useSearchDataStore((state) => state.address);

  const isPinned = !!roomUser?.start_location;

  return (
    <div className={styles.start_location_container}>
      {isDialogVisible && (
        <div ref={dialogRef} className={styles.label}>
          핀을 눌러 출발 위치를 확정해주세요.
        </div>
      )}
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
