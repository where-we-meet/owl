'use client';
import { type ChangeEvent, useState, useCallback, useRef } from 'react';
import debounce from 'lodash-es/debounce';
import { useQuerySearchPlace } from '@/hooks/useQueryPlace';
import SearchResultList from './SearchResultList';
import { SearchIcon } from './SearchIcon';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [listViewState, setListViewState] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearchInput = useCallback(debounce(handleChangeInput, 600), []);

  const handleInputFocus = () => {
    setListViewState(true);
  };

  const { data: placeList, isPending } = useQuerySearchPlace(searchKeyword);

  return (
    <div className={styles.container}>
      <div className={styles.search_container}>
        <input
          id="searchBar"
          className={styles.search_input}
          placeholder="검색해서 찾아볼래요"
          onChange={handleSearchInput}
          onFocus={handleInputFocus}
          ref={inputRef}
        />
        <SearchIcon />
      </div>
      {listViewState && (
        <SearchResultList placeList={placeList} setListViewState={setListViewState} inputRef={inputRef} />
      )}
    </div>
  );
};

export default SearchBar;
