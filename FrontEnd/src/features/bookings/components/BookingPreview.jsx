import React from "react";
import styles from "./BookingPreview.module.css";
import { LuCalendar, LuClock, LuUsers, LuCheck, LuInfo } from "react-icons/lu";
import Title from "@/ui/title/Title";
import Button from "@/ui/button/Button";

export default function BookingPreview({ 
  farmName, 
  date, 
  timeSlot, 
  guests, 
  totalPrice, 
  onClose 
}) {
  const serviceFee = 5;
  const basePrice = totalPrice - serviceFee;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <LuCheck size={32} className={styles.checkIcon} />
        </div>
        <header><Title size="lg" className={styles.title}>Booking Preview</Title></header>
        <p className={styles.subtitle}>Review your details before confirming</p>
      </div>

      <div className={styles.farmInfo}>
        <span className={styles.label}>Farm</span>
        <span className={styles.value}>{farmName}</span>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <LuCalendar size={18} />
          <div className={styles.detailText}>
            <span className={styles.detailLabel}>Date</span>
            <span className={styles.detailValue}>{date?.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        <div className={styles.detailItem}>
          <LuClock size={18} />
          <div className={styles.detailText}>
            <span className={styles.detailLabel}>Slot</span>
            <span className={styles.detailValue}>{timeSlot}</span>
          </div>
        </div>

        <div className={styles.detailItem}>
          <LuUsers size={18} />
          <div className={styles.detailText}>
            <span className={styles.detailLabel}>Guests</span>
            <span className={styles.detailValue}>{guests} People</span>
          </div>
        </div>
      </div>

      <div className={styles.priceBreakdown}>
        <div className={styles.priceRow}>
          <span>Base Price</span>
          <span>{basePrice} JOD</span>
        </div>
        <div className={styles.priceRow}>
          <span>Service Fee</span>
          <span>{serviceFee} JOD</span>
        </div>
        <div className={styles.totalRow}>
          <span>Total Amount</span>
          <span>{totalPrice} JOD</span>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.notice}>
          <LuInfo size={14} />
          <span>Final confirmation happens after clicking "Confirm Booking"</span>
        </div>
        <Button onClick={onClose} fullWidth className={styles.closeBtn}>
          Got it
        </Button>
      </div>
    </div>
  );
}
