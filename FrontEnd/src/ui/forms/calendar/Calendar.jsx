import "react-day-picker/dist/style.css";
import Title from "@/ui/title/Title";
import styles from "./Calendar.module.css";
import { DayPicker } from "react-day-picker";

export default function Calendar({ date, setValue, setDateModal }) {
  return (
    <div className={styles.calendarWrapper}>
      <Title size="md" mb="1.5rem">
        Select a Date
      </Title>
      <DayPicker
        mode="single"
        selected={date}
        onSelect={(day) => {
          setValue("date", day);
          setDateModal(false);
        }}
        className={styles.dayPicker}
      />
    </div>
  );
}
