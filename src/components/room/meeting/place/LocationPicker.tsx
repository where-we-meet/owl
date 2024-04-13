import { useParams } from 'next/navigation';
import { getCurrentUserData, updateStartLocation } from '@/api/supabaseCSR/supabase';
import { useSearchDataStore } from '@/store/placeStore';
import { objectValidate } from '@/utils/objectValidate';
import { Button } from '@nextui-org/react';

const LocationPicker = () => {
  const { id: roomId }: { id: string } = useParams();
  const {
    location: { lat, lng },
    address
  } = useSearchDataStore((state) => state);

  const handleSubmitLocation = async () => {
    const {
      user: { id: userId }
    } = await getCurrentUserData();

    const userLocationData = {
      room_id: roomId,
      user_id: userId,
      start_location: address,
      lat: lat.toString(),
      lng: lng.toString()
    };

    const resultCheck = objectValidate(userLocationData);

    if (resultCheck) {
      await updateStartLocation(userLocationData);
    } else {
      alert('no');
    }
  };

  return <Button onClick={handleSubmitLocation}>확정</Button>;
};

export default LocationPicker;
