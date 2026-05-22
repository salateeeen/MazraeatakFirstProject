import styles from "./ChangeProfilePicture.module.css";
import UserAvatar from "./UserAvatar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateProfilePicture } from "@/features/user/hooks/useUpdateProfilePicture";
import Title from "../title/Title";
import Button from "../button/Button";
import FileInput from "../forms/fileInput/FileInput";

export default function ChangeProfilePicture({ user, setOpen }) {
  const { mutate: updateProfilePicture, isPending } = useUpdateProfilePicture();
  const [previewUrl, setPreviewUrl] = useState(null);
  const {
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const previewUser = previewUrl
    ? { ...user, profilePicture: previewUrl }
    : user;
  
  function onSubmit(data) {
    if (!data.profilePicture || data.profilePicture.length === 0) return;
    updateProfilePicture(data.profilePicture[0], {
      onSuccess: () => {
        setOpen(false);
        reset();
        setPreviewUrl(null);
      },
    });
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <header><Title size="md" className={styles.title}>
        Update Profile Picture
      </Title></header>

      <div className={styles.imageSelectionArea}>
        <UserAvatar
          user={previewUser}
          size="xl"
          className={styles.previewImage}
        />

        <FileInput
          value={null}
          onChange={(file) => {
            setValue("profilePicture", [file]);
            setPreviewUrl(URL.createObjectURL(file));
          }}
          accept="image/*"
          showPreview={false}
        >
          <Button type="button" className={styles.uploadLabel}>
            Choose Image
          </Button>
        </FileInput>

        {errors.profilePicture && (
          <span className={styles.error}>{errors.profilePicture.message}</span>
        )}
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          secondary
          className={styles.button}
          onClick={() => {
            setOpen(false);
            reset();
            setPreviewUrl(null);
          }}
        >
          Cancel
        </Button>
        <Button type="submit" className={styles.button} isPending={isPending}>
          Save
        </Button>
      </div>
    </form>
  );
}
