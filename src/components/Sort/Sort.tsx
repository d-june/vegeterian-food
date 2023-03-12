import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  setSort,
  SortPropertyEnum,
} from "../../redux/slices/filterSlice";

import styles from "./Sort.module.scss";

type SortListType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export const sortList: SortListType[] = [
  { name: "популярности (DESK)", sortProperty: SortPropertyEnum.RATING_DESC },
  { name: "популярности (ASK)", sortProperty: SortPropertyEnum.RATING_ASK },
  { name: "цене (DESK)", sortProperty: SortPropertyEnum.PRICE_DESK },
  { name: "цене (ASK)", sortProperty: SortPropertyEnum.PRICE_ASK },
  { name: "алфавиту (DESK)", sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: "алфавиту (ASK)", sortProperty: SortPropertyEnum.TITLE_ASK },
];
const Sort: FC = () => {
  const { sort } = useSelector(selectFilter);
  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const onSelectSort = (obj: SortListType) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
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
};

export default Sort;
