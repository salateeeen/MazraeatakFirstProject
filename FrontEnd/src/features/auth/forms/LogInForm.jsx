import styles from "./LogInForm.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "@/ui/forms/input/Input";
import Button from "@/ui/button/Button";
import { useLogin } from "../hooks/useLogin";
import Spinner from "@/ui/spinner/Spinner";

export default function LogInForm() {
  const navigate = useNavigate();
  const logInForm = useForm();
  const { mutate: login, isPending: isLoggingIn } = useLogin();

  function onSubmit(user) {
    login(user);
  }

  function handleSignUp() {
    navigate("/signup");
  }

  function handleForgotPassword() {
    navigate("/forgot-password");
  }

  return (
    <FormProvider {...logInForm}>
      <form
        className={styles.form}
        onSubmit={logInForm.handleSubmit(onSubmit)}
      >
        <Input type="email" name="email" placeholder="Email" required />
        <Input type="password" name="password" placeholder="Password" required />
        <p
          className={`${styles.hint} ${styles.hintClickable}`}
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </p>
        <Button type="submit" isPending={isLoggingIn} disabled={isLoggingIn}>
          {isLoggingIn ? <Spinner size="xs" /> : "Log In"}
        </Button>
        <p className={styles.hint}>
          Don't have an account?{" "}
          <span onClick={handleSignUp} className={styles.link}>
            Sign up
          </span>
        </p>
      </form>
    </FormProvider>
  );
}
