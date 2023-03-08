import React, { useCallback, useRef, useState } from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/slices/productsSlice";
import { setSearchValue } from "../../redux/slices/filterSlice";

function Search(props) {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const dispatch = useDispatch();

  const updateSearchValue = useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 250),
    [value]
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        type="text"
        placeholder="Поиск..."
        className={styles.searchInput}
      />
      {value && (
        <svg
          className={styles.clearIcon}
          onClick={onClickClear}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
}

export default Search;
