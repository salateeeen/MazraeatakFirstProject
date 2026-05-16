import { useNavigate } from "react-router-dom";
import styles from "./JoinUsBanner.module.css";
import { LuPlus } from "react-icons/lu";
import { MdOutlineVilla } from "react-icons/md";

export default function JoinUsBanner() {
    const navigate = useNavigate()
  function handleJoinUs() {
    navigate("/owner/add-farm");
  }
  return (
    <section className={styles.wrapper}>
      <div className={styles.banner} onClick={handleJoinUs}>
        <div className={styles.left}>
          <h2>Join Us & Add Your Farm</h2>
          <p>
            List your chalet or farm, reach more customers, and grow your
            bookings.
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.icon}>
            <MdOutlineVilla size={42} />
            <span className={styles.plus}>
              <LuPlus size={16} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
