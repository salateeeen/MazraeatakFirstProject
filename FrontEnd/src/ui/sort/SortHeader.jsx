import styles from "./SortHeader.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { LuArrowDownWideNarrow, LuArrowUpNarrowWide } from "react-icons/lu";

const SORT_OPTIONS = [
  { id: "createdAt", label: "Latest" },
  { id: "basePrice", label: "Price" },
  { id: "ratingsAverage", label: "Rating" },
  { id: "popular", label: "Most Popular" },
  { id: "distance", label: "Distance" },
];

export default function SortHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const currentField = params.get("sort") || "createdAt";
  const currentOrder = params.get("order") || "desc";

  const handleClick = (id) => {
    const newParams = new URLSearchParams(location.search);

    let newOrder = "desc";

    if (currentField === id) {
      newOrder = currentOrder === "asc" ? "desc" : "asc";
    }

    newParams.set("sort", id);
    newParams.set("order", newOrder);

    navigate(`?${newParams.toString()}`, { replace: true });
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Sort by</span>

      <div className={styles.options}>
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.id}
            className={`${styles.option} ${
              currentField === option.id ? styles.active : ""
            }`}
            onClick={() => handleClick(option.id)}
          >
            <span>{option.label}</span>

            <span className={styles.icon}>
              {currentField === option.id &&
                (currentOrder === "asc" ? (
                  <LuArrowUpNarrowWide />
                ) : (
                  <LuArrowDownWideNarrow />
                ))}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
