import { type ChangeEvent, useState, useCallback } from 'react';
import _ from 'lodash';

import styles from './SearchBar.module.css';

import SearchResultList from './SearchResultList';
import { useGetSearchPlace } from '@/hooks/useGetPlace';

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [listViewState, setListViewState] = useState({
    inputFocused: false,
    containerHovered: false
  });

  const handleSearchInput = useCallback(
    _.debounce((event: ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      setSearchKeyword(event.target.value);
    }, 600),
    []
  );

  const handleInputFocus = () => {
    setListViewState((prev) => ({ ...prev, inputFocused: !prev.inputFocused }));
  };

  const { data: placeList, isPending } = useGetSearchPlace(searchKeyword);

  const activatePlaceList = (listViewState.inputFocused && searchKeyword !== '') || listViewState.containerHovered;

  return (
    <div className={styles.container}>
      <form className={styles.search_bar}>
        <input
          id="searchBar"
          placeholder="출발 위치 검색하기"
          onChange={handleSearchInput}
          onFocus={handleInputFocus}
          onBlur={handleInputFocus}
          autoComplete="off"
        />
      </form>
      {activatePlaceList && <SearchResultList placeList={placeList} setListViewState={setListViewState} />}
    </div>
  );
};

export default SearchBar;
