import { useHalfwayDataStore, useSearchDataStore } from '@/store/store';
import { MouseEvent } from 'react';

const SEARCH_CATEGORY = ['맛집', '카페', '음식점', '문화시설', '관광명소', '지하철역', '숙박'];

const CategorySelector = () => {
  const setSearchOption = useSearchDataStore((state) => state.setSearchOption);
  const { lat, lng, range } = useHalfwayDataStore((state) => state.halfwayData);

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
    <ul onClick={handleCategorySearch}>
      {SEARCH_CATEGORY.map((item) => (
        <li key={item} id={item}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default CategorySelector;
