'use client';
import { type ChangeEvent, useState, useCallback } from 'react';
import _ from 'lodash';
import { useGetSearchPlace } from '@/hooks/useGetPlace';
import { useSearchDataStore } from '@/store/placeStore';
import { Input } from '@nextui-org/react';
import SearchResultList from './SearchResultList';
import styles from './SearchBar.module.css';
import { SearchIcon } from './SearchIcon';

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [listViewState, setListViewState] = useState({
    inputFocused: false,
    containerHovered: false
  });

  const address = useSearchDataStore((state) => state.address);

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
      <form className={styles.search_bar} onSubmit={(e) => e.preventDefault()}>
        <Input
          id="searchBar"
          placeholder={address}
          onChange={handleSearchInput}
          onFocus={handleInputFocus}
          onBlur={handleInputFocus}
          autoComplete="off"
          startContent={<SearchIcon />}
          variant="bordered"
          size="lg"
          isClearable
        />
      </form>
      {activatePlaceList && <SearchResultList placeList={placeList} setListViewState={setListViewState} />}
    </div>
  );
};

export default SearchBar;
