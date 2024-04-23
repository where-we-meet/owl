import { useHalfwayDataStore } from '@/store/halfwayStore';
import { useSearchDataStore } from '@/store/placeStore';
import { IoMdPin } from 'react-icons/io';
import styles from './HalfwayButton.module.css';

const HalfwayButton = () => {
  const setLocation = useSearchDataStore((state) => state.setLocation);
  const { lat, lng } = useHalfwayDataStore();

  const moveToCenter = () => {
    if (!lat || !lng) return;
    setLocation({ lat, lng });
  };

  return (
    <>
      <button className={styles.center_address} title="중심 위치로 이동한다올" onClick={moveToCenter}>
        <IoMdPin /> 중심 위치 주소
      </button>
    </>
  );
};

export default HalfwayButton;
