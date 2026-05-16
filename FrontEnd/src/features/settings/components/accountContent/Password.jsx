import Button from "@/ui/button/Button";
import Input from "@/ui/forms/input/Input";
import styles from "./Password.module.css";
import { FormProvider, useForm } from "react-hook-form";

export default function Password() {
  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data) {
  }

  return (
    <FormProvider {...passwordForm}>
      <form
        className={styles.form}
        onSubmit={passwordForm.handleSubmit(onSubmit)}
      >
        <Input
          type="password"
          name={"currentPassword"}
          label={"current password"}
          placeholder={"current password"}
        />
        <Input
          type="password"
          name={"newPassword"}
          label={"new password"}
          placeholder={"new password"}
        />
        <Input
          type="password"
          name={"confirmPassword"}
          label={"confirm password"}
          placeholder={"confirm password"}
        />
        <Button type="submit">save</Button>
      </form>
    </FormProvider>
  );
}
