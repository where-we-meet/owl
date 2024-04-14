import { MouseEvent } from 'react';
import { useHalfwayDataStore, useRangeStore, useSearchDataStore } from '@/store/placeStore';
import { IoCafe, IoRestaurant } from 'react-icons/io5';
import { FaTrainSubway, FaLandmark } from 'react-icons/fa6';
import { RiMovie2Line, RiHotelBedFill } from 'react-icons/ri';
import { BiSolidParking } from 'react-icons/bi';
import styles from './CategorySelector.module.css';

const SEARCH_CATEGORY = [
  { name: '맛집', icon: <IoRestaurant /> },
  { name: '카페', icon: <IoCafe /> },
  { name: '문화시설', icon: <RiMovie2Line /> },
  { name: '관광명소', icon: <FaLandmark /> },
  { name: '지하철역', icon: <FaTrainSubway /> },
  { name: '주차장', icon: <BiSolidParking /> },
  { name: '숙박', icon: <RiHotelBedFill /> }
];

const CategorySelector = () => {
  const setSearchOption = useSearchDataStore((state) => state.setSearchOption);
  const { lat, lng } = useHalfwayDataStore((state) => state);
  const range = useRangeStore((state) => state.range);

  const handleCategorySearch = (event: MouseEvent<HTMLUListElement>) => {
    const selectCategory = (event.target as HTMLLIElement).id;
    const newSearchOption = {
      query: selectCategory,
      x: '' + lng,
      y: '' + lat,
      radius: range
    };
    setSearchOption(newSearchOption);
  };
  return (
    <ul className={styles.category} onClick={handleCategorySearch}>
      {SEARCH_CATEGORY.map((item) => (
        <li key={item.name} id={item.name}>
          {item.icon}
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default CategorySelector;
