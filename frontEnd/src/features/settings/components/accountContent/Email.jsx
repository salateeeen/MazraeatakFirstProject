import { FormProvider, useForm } from "react-hook-form";
import Input from "@/ui/forms/input/Input";
import styles from "./Email.module.css";
import Button from "@/ui/button/Button";
import { useUpdateEmail } from "@/features/user/hooks/useUpdateEmail";

export default function Email() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: updateEmail } = useUpdateEmail();

  const onSubmit = (data) => {
    updateEmail(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className={styles.container}>
      <FormProvider {...form}>
        <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
          <Input type="email" name={"email"} required />
          <Input type="password" name={"password"} required />
          <Button type="submit">save</Button>
        </form>
      </FormProvider>
    </div>
  );
}
