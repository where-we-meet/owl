import { useHalfwayDataStore } from '@/store/halfwayStore';
import { useSearchDataStore } from '@/store/placeStore';
import { IoMdPin } from 'react-icons/io';
import styles from './HalfwayButton.module.css';
import { Button, Tooltip } from '@nextui-org/react';

const HalfwayButton = () => {
  const setLocation = useSearchDataStore((state) => state.setLocation);
  const { lat, lng } = useHalfwayDataStore((state) => state.halfwayPoint);

  const moveToCenter = () => {
    if (!lat || !lng) return;
    setLocation({ lat, lng });
  };

  return (
    <>
      <Tooltip color="foreground" placement="right-end" content="중심 위치로 이동한다올">
        <Button
          className={styles.center_address}
          color="default"
          startContent={<IoMdPin size="1.4rem" />}
          onClick={moveToCenter}
        >
          중심 위치로 이동
        </Button>
      </Tooltip>
    </>
  );
};

export default HalfwayButton;
