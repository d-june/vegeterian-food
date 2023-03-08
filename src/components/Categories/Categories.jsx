import styles from "./Categories.module.scss";
import { useSelector } from "react-redux";

function Categories({ value, onChangeCategory }) {
  const { categories } = useSelector((state) => state.filter);

  const activeCategory = styles.categoryActive + " " + styles.category;
  const normalCategory = styles.category;

  return (
    <div className={styles.categories}>
      {categories.map((category, index) => {
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
  );
}

export default Categories;
