import styles from "./Categories.module.scss";

function Categories({ value, onChangeCategory }) {
  const categories = [
    "Все",
    "Пицца",
    "Фалафель",
    "Роллы",
    "Закуски",
    "Десерты",
  ];

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
