import React, { useCallback, useRef, useState } from "react";
import styles from "./Search.module.scss";

function Search(props) {
  const [value, setValue] = useState("");
  const inputRef = useRef();

  return (
    <div>
      <input
        ref={inputRef}
        value={value}
        type="text"
        placeholder="Поиск..."
        className={styles.searchInput}
      />
    </div>
  );
}

export default Search;
