import styles from "./VerifyCodeForm.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import OTPinput from "@/ui/otpInput/OTPinput";
import { useState, useEffect } from "react";
import { useVerifyResetCode } from "../hooks/useVerifyResetCode";
import { useRequestPasswordReset } from "../hooks/useRequestPasswordReset";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { formatSecondsToMinutes } from "@/utils/handleDate";

export default function VerifyCodeForm() {
  const verifyForm = useForm({ mode: "onChange" });
  const [seconds, setSeconds] = useState(600);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const { mutate: verifyMutate, isLoading: isVerifying } = useVerifyResetCode();
  const { mutate: resendMutate, isLoading: isResending } = useRequestPasswordReset();

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  function handleResendCode() {
    resendMutate(email, {
      onSuccess: () => {
        setSeconds(30);
        toast.success("A new code has been sent to your email.");
      },
    });
  }

  function onSubmit(code) {
    if (seconds === 0) {
      toast.error("The code has expired. Please request a new one.");
      return;
    }
    verifyMutate({ email, code });
  }

  return (
    <FormProvider {...verifyForm}>
      <form
        className={styles.form}
        onSubmit={verifyForm.handleSubmit(onSubmit)}
      >
        <div className={styles.header}>
          <h2>Verify Your Email</h2>
          <p>
            We've sent a 6-digit code to <strong>{email}</strong>
          </p>
        </div>

        <OTPinput onSubmit={onSubmit} disabled={seconds === 0 || isVerifying} />

        <div className={styles.timerContainer}>
          <span
            className={`${styles.expires} ${seconds < 10 ? styles.low : ""}`}
          >
            {seconds > 0 ? `Code expires in ${formatSecondsToMinutes(seconds)}` : "Code expired"}
          </span>
        </div>

        <div className={styles.footer}>
          <span className={styles.resendText}>
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={seconds > 0 || isResending}
              className={styles.resendButton}
            >
              {isResending ? "Sending..." : "Resend code"}
            </button>
          </span>
        </div>

        {seconds === 0 && (
          <span className={styles.errorText}>
            The code has expired. Please request a new one.
          </span>
        )}
      </form>
    </FormProvider>
  );
}
