import { useFormContext } from "react-hook-form";
import styles from "./PaymentMethod.module.css";
import { FaCreditCard, FaMoneyBillWave, FaPaypal } from "react-icons/fa6";
import Title from "@/ui/title/Title";

export default function PaymentMethod({ name = "paymentMethod" }) {
  const methods = [
    { value: "card", label: "Credit / Debit Card", icon: <FaCreditCard /> },
    { value: "paypal", label: "PayPal", icon: <FaPaypal /> },
    { value: "cash", label: "Cash on Arrival", icon: <FaMoneyBillWave /> },
  ];

  const form = useFormContext();
  const selected = form.watch(name);

  return (
    <div className={styles.paymentCard}>
      <header><Title>Payment Method</Title></header>
      <div className={styles.paymentOptions}>
        {methods.map((method) => (
          <div
            key={method.value}
            className={`${styles.paymentOption} ${
              selected === method.value ? styles.active : ""
            }`}
            onClick={() => form.setValue(name, method.value)}
          >
            <span className={styles.paymentIcon}>{method.icon}</span>
            <span className={styles.label}>{method.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
