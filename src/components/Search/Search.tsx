import React, { FC, useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setSearchValue } from "../../redux/slices/filter/slice";

import debounce from "lodash.debounce";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./Search.module.scss";

const Search: FC = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 150),
    [value]
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.wrapper}>
      <SearchOutlinedIcon className={styles.searchIcon} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        type="text"
        placeholder="Поиск..."
        className={styles.searchInput}
      />
      {value && (
        <CloseIcon className={styles.clearIcon} onClick={onClickClear} />
      )}
    </div>
  );
};

export default Search;
