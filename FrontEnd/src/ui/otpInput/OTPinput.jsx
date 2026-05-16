import { useEffect, useRef, useState } from "react";
import styles from "./OTPinput.module.css";

export default function OTPinput({ OTPlength = 6, onSubmit }) {
  const [otp, setOtp] = useState(Array.from({ length: OTPlength }).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    return () => {};
  }, []);

  const handleChange = function (i, e) {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[i] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === OTPlength) {
      onSubmit?.(combinedOtp);
    }

    if (value && i < OTPlength - 1 && inputRefs.current[i + 1]) {
      inputRefs.current[i + 1].focus();
    }
  };

  const handleClick = function (i) {
    inputRefs.current[i].setSelectionRange(1, 1);
  };

  const handleKeyDown = function (i, e) {
    if (e.key === "Backspace" && !otp[i] && i > 0 && inputRefs.current[i - 1]) {
      inputRefs.current[i - 1].focus();
    }
  };

  return (
    <div className={styles.container}>
      {otp.map((value, i) => {
        return (
          <input
            className={styles.input}
            key={i}
            ref={(input) => (inputRefs.current[i] = input)}
            type="text"
            value={value}
            onChange={(e) => handleChange(i, e)}
            onClick={() => handleClick(i)}
            onKeyDown={(e) => handleKeyDown(i, e)}
          />
        );
      })}
    </div>
  );
}
