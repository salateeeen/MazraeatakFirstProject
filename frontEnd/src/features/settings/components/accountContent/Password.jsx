import Button from "@/ui/button/Button";
import Input from "@/ui/forms/input/Input";
import styles from "./Password.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { useUpdatePassword } from "../../../user/hooks/useUpdatePassword";

export default function Password() {
  const {mutate: updatePassword, isPending:isUpdating} = useUpdatePassword();

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data) {
    updatePassword(data)
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
          required
        />
        <Input
          type="password"
          name={"newPassword"}
          label={"new password"}
          placeholder={"new password"}
          required
        />
        <Input
          type="password"
          name={"confirmPassword"}
          label={"confirm password"}
          placeholder={"confirm password"}
          required
        />
        <Button type="submit" isPending={isUpdating}>save</Button>
      </form>
    </FormProvider>
  );
}
