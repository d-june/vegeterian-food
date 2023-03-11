import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../redux/slices/filterSlice";

import styles from "./Sort.module.scss";

export const sortList = [
  { name: "популярности (DESK)", sortProperty: "rating" },
  { name: "популярности (ASK)", sortProperty: "-rating" },
  { name: "цене (DESK)", sortProperty: "price" },
  { name: "цене (ASK)", sortProperty: "-price" },
  { name: "алфавиту (DESK)", sortProperty: "title" },
  { name: "алфавиту (ASK)", sortProperty: "-title" },
];
function Sort(props) {
  const { sort } = useSelector((state) => state.filter);
  const [open, setOpen] = useState(false);
  const sortRef = useRef();

  const dispatch = useDispatch();

  const onSelectSort = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.sortTitle}>
        Сортировка по: <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div>
          <ul className={styles.sortList}>
            {sortList.map((obj, i) => {
              return (
                <li
                  key={i}
                  onClick={() => onSelectSort(obj)}
                  className={styles.sortType}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
