import { Avatar } from '@nextui-org/react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';

type Prop = {
  id: string;
  lat: string;
  lng: string;
  user: {
    profile_url: string | null;
    name: string;
  } | null;
};

const UserMarker = ({ id, lat, lng, user }: Prop) => {
  const userInfo = {
    name: user?.name,
    avatar: user?.profile_url
  };

  return (
    <>
      <MapMarker
        key={id}
        position={{ lat: Number(lat), lng: Number(lng) }}
        image={{
          src: '/pin.svg',
          size: {
            width: 50,
            height: 50
          }
        }}
      />
      <CustomOverlayMap position={{ lat: Number(lat), lng: Number(lng) }} yAnchor={1.4}>
        <Avatar isBordered src={`${userInfo.avatar}`} showFallback name={userInfo.name} />
      </CustomOverlayMap>
    </>
  );
};

export default UserMarker;
