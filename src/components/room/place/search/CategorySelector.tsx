'use client';

import { useEffect, useState } from 'react';
import { useRangeStore, useSearchDataStore } from '@/store/placeStore';
import styles from './CategorySelector.module.css';
import { useQueryRoomData } from '@/hooks/useQueryRoomData';
import { BedIcon, BusIcon, CafeIcon, MovieIcon, PantheonIcon, ParkingIcon, SpoonIcon } from './CategoryIcons';

const SEARCH_CATEGORY = [
  { name: '맛집', icon: <SpoonIcon style={{ width: '1.8rem', height: '1.8rem' }} /> },
  { name: '카페', icon: <CafeIcon style={{ width: '1.8rem', height: '1.8rem' }} /> },
  { name: '문화시설', icon: <MovieIcon style={{ width: '1.8rem', height: '1.8rem' }} /> },
  { name: '관광명소', icon: <PantheonIcon style={{ width: '1.8rem', height: '1.8rem' }} /> },
  { name: '지하철역', icon: <BusIcon style={{ width: '1.8rem', height: '1.8rem' }} /> },
  { name: '주차장', icon: <ParkingIcon style={{ width: '1.8rem', height: '1.8rem' }} /> },
  { name: '숙박', icon: <BedIcon style={{ width: '1.8rem', height: '1.8rem' }} /> }
];

const CategorySelector = () => {
  const [currentSelected, setCurrentSelected] = useState('');
  const { data: room } = useQueryRoomData();
  const searchOption = useSearchDataStore((state) => state.searchOption);
  const { setSearchOption, updateSearchRange } = useSearchDataStore((state) => state);
  const range = useRangeStore((state) => state.range);

  const handleSearch = (category: string) => {
    if (currentSelected === category) {
      setCurrentSelected('');
      setSearchOption(null);
    } else {
      if (room && room.lat && room.lng) {
        const newSearchOption = {
          query: category,
          x: room.lng,
          y: room.lat,
          radius: range
        };
        setCurrentSelected(category);
        setSearchOption(newSearchOption);
      }
    }
  };

  useEffect(() => {
    updateSearchRange(range);
  }, [range]);

  return (
    <ul className={styles.category}>
      {SEARCH_CATEGORY.map((item) => (
        <li
          key={item.name}
          className={`${searchOption && searchOption.query === item.name && styles.selected}`}
          onClick={() => handleSearch(item.name)}
        >
          <div key={`${item.name}-icon`}>{item.icon}</div>
          <span key={`${item.name}-label`} className={styles.name}>
            {item.name}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default CategorySelector;
