import { useParams } from 'next/navigation';
import { updateStartLocation } from '@/api/supabaseCSR/supabase';
import { useSearchDataStore } from '@/store/placeStore';
import { objectValidate } from '@/utils/objectValidate';
import { Button } from '@nextui-org/react';
import { useQueryUser } from '@/hooks/useQueryUser';

const LocationPicker = () => {
  const { id: roomId }: { id: string } = useParams();
  const {
    location: { lat, lng },
    address
  } = useSearchDataStore((state) => state);

  const handleSubmitLocation = async () => {
    const { id: userId } = useQueryUser();

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
