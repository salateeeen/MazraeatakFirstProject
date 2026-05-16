import { useState } from "react";
import styles from "./Stepper.module.css";
import { MdCheck } from "react-icons/md";

export default function Stepper({ currentStep, totalSteps = 4, setCurrentStep }) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  const handleStepClick = (step) => {
    if (step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => {
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={step} className={styles.stepWrapper}>
            <div
              className={`${styles.step} ${isActive ? styles.active : ""} ${
                isCompleted ? styles.completed : ""
              }`}
              onClick={() => handleStepClick(step)}
            >
              {isCompleted ? <MdCheck /> : step}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`${styles.line} ${
                  isCompleted ? styles.lineCompleted : ""
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
