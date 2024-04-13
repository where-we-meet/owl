import { MapMarker } from 'react-kakao-maps-sdk';

const Halfway = ({ location }: { location: { lat: number; lng: number } }) => {
  return (
    <MapMarker
      key={'halfway'}
      position={location}
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

export default Halfway;
