import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Side.module.css";
import { capitalizeFirstLetter } from "@/utils/handleStrings";

export default function Side({ className, items, iconIN = "start" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = function (navigat) {
    navigate(`${navigat}`);
  };

  return (
      <ul className={`${styles.list} ${className}`}>
        {items.map((item, index) => (
          <li
            key={index}
            className={`${
              location.pathname.startsWith(item.path) ? styles.active : ""
            } 
            ${iconIN === "end" ? styles.end : ""}`}
            onClick={() => handleClick(item.path)}
          >
            {iconIN === "start" ? (
              <>
                <span className={styles.icon}>{<item.icon />}</span>
                <span className={styles.label}>{capitalizeFirstLetter(item.label)}</span>
              </>
            ) : (
              <>
              <span className={styles.label}>{capitalizeFirstLetter(item.label)}</span>
                <span className={styles.icon}>{<item.icon />}</span>
              </>
            )}
          </li>
        ))}
      </ul>
  );
}
