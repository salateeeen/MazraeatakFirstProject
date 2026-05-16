import UserAvatar from "@/ui/profile/UserAvatar";
import styles from "./FarmOwnerCard.module.css";

export default function FarmOwnerCard({ owner }) {
  return (
    <section className={styles.card}>
      <h4>Farm Owner</h4>

      <UserAvatar user={owner} showName={true} readOnly />

      <p className={styles.note}>
        This farm is managed by a verified owner
      </p>
    </section>
  );
}
