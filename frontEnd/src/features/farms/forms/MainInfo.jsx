import React from "react";
import stepStyles from "./MainInfo.module.css";
import Input from "@/ui/forms/input/Input";
import TextArea from "@/ui/forms/textArea/TextArea";
import CheckBoxFacilities from "@/ui/facilities/components/CheckBoxFacilities";
import SelectCategory from "@/ui/categories/forms/SelectCategory";

export default function MainInfo() {
  return (
    <div className={stepStyles.stepContainer}>
      <div className={stepStyles.card}>
        <h4 className={stepStyles.sectionTitle}>Basic Information</h4>

        <div className={stepStyles.rowInputs}>
          <Input
            name="farmName"
            label="Farm Name"
            placeholder="Farm Name"
            required
          />
          <SelectCategory />
          <CheckBoxFacilities />
        </div>

        <div className={stepStyles.rowInputs}>
          <Input
            name="maximumGuests"
            label="Maximum Guests"
            type="number"
            placeholder="Maximum Guests"
            required
          />
          <Input
            name="numberOfRooms"
            label="Number of Rooms"
            type="number"
            placeholder="Number of Rooms"
            required
          />
          <Input
            name="area"
            label="Area (m²)"
            type="number"
            placeholder="Area"
            required
          />
        </div>
      </div>

      {/* 🔥 description */}
      <div className={stepStyles.card}>
        <h4 className={stepStyles.sectionTitle}>Description</h4>
        <TextArea
          name="description"
          label="Farm Description"
          placeholder="Tell guests what makes your farm special..."
          required
        />
      </div>
    </div>
  );
}
