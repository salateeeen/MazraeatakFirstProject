import { MdHome } from "react-icons/md";
import styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";
import Button from "@/ui/button/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorWrapper}>
          <p className={styles.label}>ERROR</p>
          <h1 className={styles.code}>404</h1>
        </div>
        
        <div className={styles.textGroup}>
          <h2 className={styles.title}>Page not found</h2>
          <p className={styles.text}>
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Button className={styles.homeBtn} onClick={() => navigate("/app/home")}>
          <MdHome size={22} />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
