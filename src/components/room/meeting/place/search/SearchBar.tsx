import { type ChangeEvent, useState, useCallback } from 'react';
import _ from 'lodash';

import styles from './SearchBar.module.css';

import SearchResultList from './SearchResultList';
import { useGetSearchPlace } from '@/hooks/useGetPlace';
import { Input } from '@nextui-org/react';
import GeolocationButton from '../GeolocationButton';

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [listViewState, setListViewState] = useState({
    inputFocused: false,
    containerHovered: false
  });

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearchInput = useCallback(_.debounce(handleChangeInput, 600), []);

  const handleInputFocus = () => {
    setListViewState((prev) => ({ ...prev, inputFocused: !prev.inputFocused }));
  };

  const { data: placeList, isPending } = useGetSearchPlace(searchKeyword);

  const activatePlaceList = (listViewState.inputFocused && searchKeyword !== '') || listViewState.containerHovered;

  return (
    <div className={styles.container}>
      <form className={styles.search_bar}>
        <Input
          id="searchBar"
          placeholder="출발 위치 검색하기"
          onChange={handleSearchInput}
          onFocus={handleInputFocus}
          onBlur={handleInputFocus}
          autoComplete="off"
          startContent={<GeolocationButton />}
        />
      </form>
      {activatePlaceList && <SearchResultList placeList={placeList} setListViewState={setListViewState} />}
    </div>
  );
};

export default SearchBar;
