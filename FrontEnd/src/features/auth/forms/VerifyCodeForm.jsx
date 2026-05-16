import styles from "./VerifyCodeForm.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import OTPinput from "@/ui/otpInput/OTPinput";
import { useVerifyResetCode } from "../hooks/useVerifyResetCode";
import { useState, useEffect } from "react";

export default function VerifyCodeForm() {
  const verifyForm = useForm({ mode: "onChange" });
  const [seconds, setSeconds] = useState(30);
  const location = useLocation();
  const email = location.state?.email;
  const { mutate } = useVerifyResetCode();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleResendCode() {
    mutate({ email });
  }

  function onSubmit(code) {
    mutate({ email, code });
  }

  return (
    <FormProvider {...verifyForm}>
      <form
        className={styles.form}
        onSubmit={verifyForm.handleSubmit(onSubmit)}
      >
        <OTPinput onSubmit={onSubmit} />
        <span className={styles.expires}>
          Code expires in {seconds} minutes
        </span>
        <span className={styles.resendText}>
          Didn't receive the code?{" "}
          <span onClick={handleResendCode} className={styles.link}>
            Resend code
          </span>
        </span>
      </form>
    </FormProvider>
  );
}
