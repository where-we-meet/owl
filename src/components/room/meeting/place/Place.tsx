'use client';

import KakaoMap from './KakaoMap';
import SearchBar from './search/SearchBar';

const Place = () => {
  return (
    <div>
      <SearchBar />
      <KakaoMap />
    </div>
  );
};

export default Place;
