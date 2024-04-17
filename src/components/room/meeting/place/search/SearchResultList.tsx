import type { Dispatch, SetStateAction, MouseEvent, TouchEvent, MutableRefObject } from 'react';
import { Place } from '@/types/place.types';
import { useSearchDataStore } from '@/store/placeStore';
import { changeToViewPoint } from '@/utils/place/changeToViewPoint';
import styles from './SearchResultList.module.css';

type Props = {
  placeList: Place[];
  setListViewState: Dispatch<SetStateAction<boolean>>;
  inputRef: MutableRefObject<HTMLInputElement | null>;
};

const SearchResultList = ({ placeList, setListViewState, inputRef }: Props) => {
  const setLocation = useSearchDataStore((state) => state.setLocation);

  const handleChangeViewPoint = (place: Place) => {
    const point = changeToViewPoint(place);
    setLocation(point);
  };

  const handleClickList = (event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    if (inputRef.current) inputRef.current.blur();
    setListViewState(false);
  };

  const handleTouchList = (event: TouchEvent<HTMLLIElement>) => {
    event.stopPropagation();
    if (inputRef.current) inputRef.current.blur();
    setListViewState(false);
  };

  return (
    <div className={styles.places_container}>
      <ul>
        {placeList?.map((place) => (
          <li
            key={place.id}
            onClick={(event) => {
              handleClickList(event);
              handleChangeViewPoint(place);
            }}
            onTouchEnd={(event) => {
              handleTouchList(event);
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
