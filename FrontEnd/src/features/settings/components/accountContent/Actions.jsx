import styles from "./Actions.module.css";

export default function Actions() {
  return (
    <form className={styles.actions}>

      <div className={styles.actionBox}>
          <h4>Logout from all devices</h4>
          <p>Sign out from all active sessions for your account.</p>
      </div>

      <div className={styles.actionBox}>
          <h4> Disable account</h4>
          <p>Your account will become inactive until you sign in again.</p>
      </div>

      <div className={styles.actionBox}>
          <h4>Delete account</h4>
          <p>This will permanently remove your account and all linked data.</p>
      </div>
    </form>
  );
}
