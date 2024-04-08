import { MapMarker } from 'react-kakao-maps-sdk';

const UserMarker = ({ id, lat, lng }: { id: string; lat: string; lng: string }) => {
  return (
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
  );
};

export default UserMarker;
