import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { LuSettings, LuCalendarDays, LuHeart, LuCirclePlus } from "react-icons/lu";
import { MdOutlineVilla, MdHome } from "react-icons/md";

export default function Nav({ className }) {
  const navItems = [
    { to: "/app/home", icon: <MdHome />, label: "Home" },
    { to: "/app/favorites", icon: <LuHeart />, label: "Favorites" },
    { to: "/owner/my-farms", icon: <MdOutlineVilla />, label: "My Farms" },
    { to: "/owner/add-farm", icon: <LuCirclePlus />, label: "Add Farm" },
    { to: "/app/bookings", icon: <LuCalendarDays />, label: "Bookings" },
    { to: "/app/settings", icon: <LuSettings />, label: "Settings" },
  ];

  return (
    <nav className={`${styles.nav} ${className}`}>
      <ul className={styles.list}>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
