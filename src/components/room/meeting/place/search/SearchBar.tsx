import { ChangeEvent, ReactEventHandler, useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setSearchKeyword(event.target.value);
  };

  console.log(searchKeyword);
  return (
    <form className={styles.search_bar}>
      <input
        id="searchBar"
        placeholder="출발 위치 검색하기"
        value={searchKeyword}
        onChange={handleSearchInput}
        autoComplete="off"
      />
    </form>
  );
};

export default SearchBar;
