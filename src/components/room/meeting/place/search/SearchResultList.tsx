import React, { type Dispatch, type SetStateAction, type MouseEvent } from 'react';
import styles from './SearchResultList.module.css';
import { useGetSearchPlace } from '@/hooks/useGetPlace';
import { changeToViewPoint } from '@/utils/place/changeToViewPoint';
import { Place } from '@/types/place.types';
import { useSearchDataStore } from '@/store/store';

const SearchResultList = ({
  placeList,
  setListViewState
}: {
  placeList: Place[];
  setListViewState: Dispatch<
    SetStateAction<{
      inputFocused: boolean;
      containerHovered: boolean;
    }>
  >;
}) => {
  const setCenter = useSearchDataStore((state) => state.setCenter);

  const handleListFocus = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setListViewState((prev) => ({ ...prev, containerHovered: !prev.containerHovered }));
  };

  const handleChangeViewPoint = (place: Place) => {
    const point = changeToViewPoint(place);
    setCenter(point);
  };
  return (
    <div className={styles.places_container} onMouseEnter={handleListFocus} onMouseLeave={handleListFocus}>
      <ul>
        {placeList?.map((place) => (
          <li
            key={place.id}
            onClick={() => {
              handleChangeViewPoint(place);
            }}
            onTouchEnd={() => {
              handleChangeViewPoint(place);
            }}
          >
            <p className={styles.place_name}>{place.place_name}</p>
            <p className={styles.road_address_name}>{place.road_address_name}</p>
            <p className={styles.category_group_name}>{place.category_group_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultList;
