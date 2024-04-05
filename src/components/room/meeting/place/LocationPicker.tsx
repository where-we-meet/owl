import { useParams } from 'next/navigation';
import { getCurrentUserData, updateStartLocation } from '@/api/supabaseCSR/supabase';
import { useSearchDataStore } from '@/store/store';

const LocationPicker = () => {
  const { id: roomId }: { id: string } = useParams();
  const address = useSearchDataStore((state) => state.address);

  const handleSubmitLocation = async () => {
    const {
      user: { id: userId }
    } = await getCurrentUserData();
    if (roomId && userId && address) {
      await updateStartLocation(roomId, userId, address);
    } else {
      alert('no');
    }
  };

  return <button onClick={handleSubmitLocation}>내 위치 확정</button>;
};

export default LocationPicker;
