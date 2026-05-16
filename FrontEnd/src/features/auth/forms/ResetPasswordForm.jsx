import styles from "./ResetPasswordForm.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Input from "@/ui/forms/input/Input";
import Button from "@/ui/button/Button";
import { useResetPassword } from "../hooks/useResetPassword";
import Spinner from "@/ui/spinner/Spinner";

export default function ResetPasswordForm() {
  const resetForm = useForm({ mode: "onChange" });
  const {
    formState: { isValid },
  } = resetForm;
  const location = useLocation();
  const email = location.state?.email;
  const { message, mutate, isLoading } = useResetPassword();

  function onSubmit(data) {
    mutate({ email, password: data.password });
  }

  return (
    <>
      <FormProvider {...resetForm}>
        <form
          className={styles.form}
          onSubmit={resetForm.handleSubmit(onSubmit)}
        >
          <Input
            name="password"
            type="password"
            placeholder="New password"
            required
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            required
          />
          <Button type="submit" disabled={!isValid || isLoading}>
            {isLoading ? "Saving..." : "Reset Password"}
          </Button>
        </form>
      </FormProvider>
      {message && <p className={styles.info}>{message}</p>}
    </>
  );
}
