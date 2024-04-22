import { useHalfwayDataStore } from '@/store/halfwayStore';
import { useSearchDataStore } from '@/store/placeStore';

const HalfwayButton = () => {
  const setLocation = useSearchDataStore((state) => state.setLocation);
  const { lat, lng } = useHalfwayDataStore();

  const moveToCenter = () => {
    if (!lat || !lng) return;
    setLocation({ lat, lng });
  };

  return (
    <>
      <button onClick={moveToCenter}>중심지점으로 이동</button>
    </>
  );
};

export default HalfwayButton;
