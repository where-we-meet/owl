'use client';

import KakaoMap from './KakaoMap';
import LocationPicker from './LocationPicker';
import CategorySelector from './search/CategorySelector';
import SearchBar from './search/SearchBar';

const Place = () => {
  return (
    <div>
      <SearchBar />
      <KakaoMap />
      <LocationPicker />
      <CategorySelector />
    </div>
  );
};

export default Place;
