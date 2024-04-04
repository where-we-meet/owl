'use client';

import KakaoMap from './KakaoMap';
import LocationPicker from './LocationPicker';
import SearchBar from './search/SearchBar';

const Place = () => {
  return (
    <div>
      <SearchBar />
      <KakaoMap />
      <LocationPicker />
    </div>
  );
};

export default Place;
