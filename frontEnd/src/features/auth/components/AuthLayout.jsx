import styles from "./AuthLayout.module.css";
import { MdVilla } from "react-icons/md";
import Title from "@/ui/title/Title";
import Button from "@/ui/button/Button";

export default function AuthLayout({ title, children }) {
  return (
    <div className={styles.authContainer}>
      <div className={styles.leftSide}>
        <div className={styles.brandContent}>
          <h1>Mazraetak</h1>
          <p>The best platform for booking farms and villas in the region.</p>
          <Button className={styles.btn}>Explore Now</Button>
        </div>
      </div>
      
      <div className={styles.rightSide}>
        <div className={styles.formWrapper}>
          <header className={styles.logo}>
            <MdVilla size={60} />
            <header><Title size="xl">{title}</Title></header>
          </header>
          <div className={styles.formContent}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
