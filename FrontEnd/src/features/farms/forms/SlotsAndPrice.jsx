import React from "react";
import stepStyles from "./SlotsAndPrice.module.css";
import Input from "@/ui/forms/input/Input";

export default function SlotsAndPrice() {
  const days = ["weekday", "weekend"];
  const slots = ["morning", "evening", "fullDay"];

  return (
    <div className={stepStyles.stepContainer}>
      
      {/* 🔥 pricing section */}
      <div className={stepStyles.card}>
        <h4 className={stepStyles.sectionTitle}>Pricing</h4>

        {days.map((day) => (
          <div key={day} className={stepStyles.subSection}>
            <h5 className={stepStyles.subTitle}>
              {day.toUpperCase()} Prices
            </h5>

            <div className={stepStyles.rowInputs}>
              {slots.map((slot) => (
                <Input
                  key={slot}
                  name={`pricing.${day}.${slot}`}
                  type="number"
                  placeholder={`${slot} price`}
                  label={`${slot} price`}
                  required
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 time slots section */}
      <div className={stepStyles.card}>
        <h4 className={stepStyles.sectionTitle}>Time Slots</h4>

        {slots.map((slot) => (
          <div key={slot} className={stepStyles.subSection}>
            <h5 className={stepStyles.subTitle}>{slot}</h5>

            <div className={stepStyles.rowInputs}>
              <Input
                name={`timeSlots.${slot}.from`}
                type="time"
                label={`${slot} from`}
                required
              />
              <Input
                name={`timeSlots.${slot}.to`}
                type="time"
                label={`${slot} to`}
                required
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
