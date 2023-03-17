import { FC, memo } from "react";
import { useSelector } from "react-redux";

import styles from "./Categories.module.scss";

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const Categories: FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
  const { categories } = useSelector((state: any) => state.filter);

  const activeCategory = styles.categoryActive + " " + styles.category;
  const normalCategory = styles.category;

  return (
    <div className={styles.categories}>
      <div className="container">
        <div className={styles.categoriesWrapper}>
          {categories.map((category: any, index: number) => {
            return (
              <li
                key={category}
                onClick={() => onChangeCategory(index)}
                className={index === value ? activeCategory : normalCategory}
              >
                {category}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Categories;
