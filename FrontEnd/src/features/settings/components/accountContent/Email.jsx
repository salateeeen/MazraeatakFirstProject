import Input from "@/ui/forms/input/Input";
import styles from "./Email.module.css";
import Button from "@/ui/button/Button";

export default function Email() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <Input type="email" name={"Email"} />
        <Button>save</Button>
      </form>
    </div>
  );
}
