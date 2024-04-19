'use client';

import { useParams } from 'next/navigation';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useSearchDataStore } from '@/store/placeStore';
import { objectValidate } from '@/utils/objectValidate';
import { TbPinFilled, TbPin } from 'react-icons/tb';
import styles from './LocationSwitch.module.css';
import { useUpdateStartLocation } from '@/hooks/useMutateUserData';
import { Dispatch, SetStateAction } from 'react';

const LocationSwitch = ({ toggleState }: { toggleState: boolean }) => {
  const { id: roomId }: { id: string } = useParams();
  const { id: userId } = useQueryUser();
  const {
    location: { lat, lng },
    address
  } = useSearchDataStore((state) => state);

  const { mutateAsync, isSuccess } = useUpdateStartLocation();

  const handleSubmitLocation = async () => {
    try {
      if (toggleState) {
        const userLocationData = {
          room_id: roomId,
          user_id: userId,
          start_location: '',
          lat: null,
          lng: null
        };

        await mutateAsync(userLocationData);
      } else {
        const userLocationData = {
          room_id: roomId,
          user_id: userId,
          start_location: address,
          lat: lat.toString(),
          lng: lng.toString()
        };

        const resultCheck = objectValidate(userLocationData);

        if (resultCheck) {
          await mutateAsync(userLocationData);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper} onClick={handleSubmitLocation}>
      {toggleState ? <TbPinFilled size={25} /> : <TbPin size={25} />}
    </div>
  );
};

export default LocationSwitch;
