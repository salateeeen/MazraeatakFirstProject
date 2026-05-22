import { useNavigate } from "react-router-dom";
import styles from "./JoinUsBanner.module.css";
import { LuPlus } from "react-icons/lu";
import { MdOutlineVilla } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/user/userSlice";
import { selectUserRole } from "@/features/user/userSlice";

export default function JoinUsBanner() {
    const navigate = useNavigate()
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const role = useSelector(selectUserRole);
    
  function handleJoinUs() {
    if (!isAuthenticated) {
        navigate("/login");
        return;
    }
    if (role === "user") {
        navigate("/app/settings/request-owner/request");
        return;
    }
    if (role === "owner") {
        navigate("/owner/add-farm");
        return;
    }
  }
  return (
    <section className={styles.wrapper}>
      <div className={styles.banner} onClick={handleJoinUs}>
        <div className={styles.left}>
          <h2>{role === "user" ? "Join Us & Add Your Farm" : "Be a Host"}</h2>
          <p>
            {role === "user" ? "List your chalet or farm, reach more customers, and grow your bookings." : "If you own a chalet or farm, list it here to reach more customers and grow your bookings."}
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
