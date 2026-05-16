import styles from "./SignUpForm.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "@/ui/forms/input/Input";
import Button from "@/ui/button/Button";
import { useSignup } from "../hooks/useSignup";
import Spinner from "@/ui/spinner/Spinner";

export default function SignUpForm() {
  const navigate = useNavigate();

  const signUpForm = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { mutate: signup, isPending: isSigningUp } = useSignup();

  function onSubmit(user) {
    signup(user);
  }

  function handleLogIn() {
    navigate("/login");
  }

  return (
    <FormProvider {...signUpForm}>
      <form
        className={styles.form}
        onSubmit={signUpForm.handleSubmit(onSubmit)}
      >
        <Input type="text" name="firstName" label={"First Name"} placeholder="First Name" />
        <Input type="text" name="lastName" label={"Last Name"} placeholder="Last Name" />
        <Input type="email" name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Password" />
        <Input type="password" name="confirmPassword" label="Confirm Password" placeholder="Confirm Password" />
        <Button type="submit" disabled={isSigningUp}>
          {isSigningUp ? <Spinner size="xs" color="#fff" /> : "Sign Up"}
        </Button>
        <p className={styles.hint}>
          Already have an account?{" "}
          <span onClick={handleLogIn} className={styles.link}>
            Login
          </span>
        </p>
      </form>
    </FormProvider>
  );
}
