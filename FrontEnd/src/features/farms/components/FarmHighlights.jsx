import { LuUsers, LuHouse, LuShieldCheck } from "react-icons/lu";
import styles from "./FarmHighlights.module.css";

export default function FarmHighlights({ farm }) {
  return (
    <section className={styles.card}>
      <h4>Why this farm?</h4>

      <ul>
        <li>
          <LuUsers /> Perfect for groups up to {farm.maximumGuests}
        </li>
        <li>
          <LuHouse /> {farm.numberOfRooms} fully equipped rooms
        </li>
        <li>
          <LuShieldCheck /> Trusted & reviewed by guests
        </li>
      </ul>
    </section>
  );
}
