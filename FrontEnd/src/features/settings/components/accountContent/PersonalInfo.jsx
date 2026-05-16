import Button from "@/ui/button/Button";
import Input from "@/ui/forms/input/Input";
import styles from "./PersonalInfo.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { useUpdateMe } from "@/features/user/hooks/useUpdateMe";

export default function PersonalInfo() {
  const profileForm = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      birthday: "",
    },
  });
  const { mutate: updateMe, isPending: isUpdatingMe } = useUpdateMe();
  
  function onSubmit(formData) {
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined,
      ),
    );
    updateMe(filteredData);
  }

  return (
    <FormProvider {...profileForm}>
      <form
        className={styles.form}
        onSubmit={profileForm.handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
        />{" "}
        <Input
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
        />
        <Input
          type="tel"
          name="phone"
          label="Phone"
          placeholder="Enter your phone number"
        />
        <Input
          type="date"
          name="birthday"
          label="Birthday"
          placeholder="Select your birthday"
        />
        <Button type="submit" disabled={isUpdatingMe}>
          {isUpdatingMe ? "Saving..." : 'Save'}
        </Button>
      </form>
    </FormProvider>
  );
}
