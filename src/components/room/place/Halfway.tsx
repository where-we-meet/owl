import { MapMarker } from 'react-kakao-maps-sdk';

const Halfway = ({ location }: { location: { lat: number; lng: number } }) => {
  return (
    <MapMarker
      key={'halfway'}
      position={location}
      image={{
        src: '/images/center_owl.png',
        size: {
          width: 80,
          height: 70
        }
      }}
    />
  );
};

export default Halfway;
