'use client';
import { type ChangeEvent, useState, useCallback, useRef } from 'react';
import _ from 'lodash';
import { useGetSearchPlace } from '@/hooks/useGetPlace';
import { useSearchDataStore } from '@/store/placeStore';
import SearchResultList from './SearchResultList';
import { SearchIcon } from './SearchIcon';
import { Input } from '@nextui-org/react';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [listViewState, setListViewState] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const address = useSearchDataStore((state) => state.address);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearchInput = useCallback(_.debounce(handleChangeInput, 600), []);

  const handleInputFocus = () => {
    setListViewState(true);
  };

  const { data: placeList, isPending } = useGetSearchPlace(searchKeyword);

  return (
    <div className={styles.container}>
      <Input
        id="searchBar"
        className={styles.search_input}
        placeholder={address}
        onChange={handleSearchInput}
        onFocus={handleInputFocus}
        autoComplete="off"
        startContent={<SearchIcon />}
        variant="bordered"
        size="lg"
        isClearable
        ref={inputRef}
      />
      {listViewState && (
        <SearchResultList placeList={placeList} setListViewState={setListViewState} inputRef={inputRef} />
      )}
    </div>
  );
};

export default SearchBar;
