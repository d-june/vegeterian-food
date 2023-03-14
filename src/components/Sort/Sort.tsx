import React, { FC, memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setSort } from "../../redux/slices/filter/slice";
import { SortPropertyEnum, SortType } from "../../redux/slices/filter/types";

import styles from "./Sort.module.scss";

type SortProps = {
  sort: SortType;
};

export const sortList: SortType[] = [
  {
    name: "популярности (по убыванию)",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  {
    name: "популярности (по возрастанию)",
    sortProperty: SortPropertyEnum.RATING_ASK,
  },
  { name: "цене (по убыванию)", sortProperty: SortPropertyEnum.PRICE_DESK },
  { name: "цене (по возрастанию)", sortProperty: SortPropertyEnum.PRICE_ASK },
  { name: "алфавиту (по убыванию)", sortProperty: SortPropertyEnum.TITLE_DESC },
  {
    name: "алфавиту (по возрастанию)",
    sortProperty: SortPropertyEnum.TITLE_ASK,
  },
];

const Sort: FC<SortProps> = memo(({ sort }) => {
  const sortRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const onSelectSort = (obj: SortType) => {
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
    <div className="container">
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
    </div>
  );
});
export default Sort;
