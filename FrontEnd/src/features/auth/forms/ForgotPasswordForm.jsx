import styles from "./ForgotPasswordForm.module.css";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/ui/forms/input/Input";
import Button from "@/ui/button/Button";
import { useRequestPasswordReset } from "../hooks/useRequestPasswordReset";

export default function ForgotPasswordForm() {
  const form = useForm({ mode: "onChange" });
  const {
    formState: { isValid },
  } = form;
  const { mutate: requestReset, isPending: isRequesting } = useRequestPasswordReset();

  function onSubmit(data) {
    requestReset(data.identifier);
  }

  return (
    <FormProvider {...form}>
      <form
        className={styles.form}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input
          name="identifier"
          placeholder="Email, phone number, or username"
          required
        />
        <Button type="submit" disabled={!isValid} isPending={isRequesting}>
          Next
        </Button>
      </form>
    </FormProvider>
  );
}
