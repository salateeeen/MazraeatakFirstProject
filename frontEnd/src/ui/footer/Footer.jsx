import styles from "./Footer.module.css";
import { LuFacebook, LuInstagram, LuTwitter } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <h3>Mazraetak</h3>
          <p>Book premium chalets & farm stays with ease.</p>
        </div>

        {/* Links */}
        <ul className={styles.links}>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Privacy</a></li>
        </ul>

        {/* Social */}
        <div className={styles.social}>
          <a href="#"><LuFacebook size={20} /></a>
          <a href="#"><LuTwitter size={20} /></a>
          <a href="#"><LuInstagram size={20} /></a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2025 Mazraetak. All rights reserved.</span>
      </div>
    </footer>
  );
}
