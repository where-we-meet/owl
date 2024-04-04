import { getCurrentUserData, updateStartLocation } from '@/api/supabase';
import { useSearchDataStore } from '@/store/store';
import { useParams } from 'next/navigation';

const LocationPicker = () => {
  const { id: roomId }: { id: string } = useParams();
  const searchCenter = useSearchDataStore((state) => state.center);

  const handleSubmitLocation = async () => {
    const {
      user: { id: userId }
    } = await getCurrentUserData();
    if (roomId && userId && searchCenter) {
      console.log('roomId => ', roomId, 'userId => ', userId, 'searchCenter => ', searchCenter);
      await updateStartLocation(roomId, userId, searchCenter.addressName);
    } else {
      console.log('roomId => ', roomId, 'userId => ', userId, 'searchCenter => ', searchCenter);
      alert('no');
    }
  };

  return <button onClick={handleSubmitLocation}>내 위치 확정</button>;
};

export default LocationPicker;
