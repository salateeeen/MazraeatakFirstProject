import { useFormContext } from "react-hook-form";
import SelectCard from "@/ui/forms/optionCard/SelectCard";
import { FaCreditCard, FaMoneyBillWave, FaPaypal } from "react-icons/fa6";
import Title from "@/ui/title/Title";
import styles from "./PaymentMethod.module.css";

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
          <SelectCard
            key={method.value}
            selected={selected === method.value}
            onClick={() => form.setValue(name, method.value)}
            title={method.label}
            icon={method.icon}
          />
        ))}
      </div>
    </div>
  );
}
