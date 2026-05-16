import { useLocation, useNavigate } from "react-router-dom";
import styles from "./DashboardSide.module.css";
import { capitalizeFirstLetter } from "@/utils/handleStrings";
import { MdHome } from "react-icons/md";

export default function DashboardSide({ items, isOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.logo}>
        <h1>Mazreatak <span>Pro</span></h1>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {items.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <li
                key={index}
                className={`${styles.item} ${isActive ? styles.active : ""}`}
                onClick={() => navigate(item.path)}
              >
                <span className={styles.icon}>
                  {Icon && <Icon size={20} />}
                </span>
                <span className={styles.label}>
                  {capitalizeFirstLetter(item.label)}
                </span>
                {isActive && <div className={styles.activePill} />}
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className={styles.footer}>
        <li
          className={styles.item}
          onClick={() => navigate("/app/home")}
        >
          <span className={styles.icon}>
            <MdHome size={22} />
          </span>
          <span className={styles.label}>Back to Home</span>
        </li>
      </div>
    </aside>
  );
}
