import styles from "./CategoriesList.module.css";

import { useNavigate } from "react-router-dom";
import Title from "@/ui/title/Title";
import { useCategories } from "../hooks/useCategories";
import { memo } from "react";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import CategoryCard from "./CategoryCard";

function CategoriesList() {
  const navigate = useNavigate();
  const { data: categories, isPending, error } = useCategories();

  function handleClick(category) {
    const params = new URLSearchParams();
    if (category?._id) {
      params.set("category", category._id);
    }
    navigate(`/app/farms?${params.toString()}`, { replace: false });
  }

  return (
    <div className={styles.container}>
      <Title subtitle="Browse through the categories and find the perfect farm for you">categories</Title>

      <div className={styles.cards}>
        {isPending &&
          Array.from({ length: 3 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}

        {!isPending &&
          !error &&
          categories?.data?.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onClick={() => handleClick(category)}
            />
          ))}
        {!isPending && error && <h1>{error.message}</h1>}
      </div>
    </div>
  );
}

export default memo(CategoriesList);
