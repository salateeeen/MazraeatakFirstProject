import React from "react";
import stepStyles from "./AddImages.module.css";
import { LuImagePlus, LuX } from "react-icons/lu";
import { useFormContext, Controller } from "react-hook-form";
import FileInput from "@/ui/forms/fileInput/FileInput";

export default function AddImages() {
  const { control, watch, setValue } = useFormContext();

  const images = watch("images");
  const coverImage = watch("coverImage");

  function handleRemove(index) {
    const newImages = Array.from(images);
    newImages.splice(index, 1);
    setValue("images", newImages);
  }

  return (
    <div className={stepStyles.container}>
      {/* 🔥 Cover Image */}
      <div className={stepStyles.card}>
        <h4 className={stepStyles.sectionTitle}>Cover Image</h4>

        <Controller
          name="coverImage"
          control={control}
          render={({ field }) => (
            <FileInput
              value={coverImage}
              onChange={(file) => field.onChange(file)}
              label="Upload cover image"
              hint="Click or drag & drop"
              showPreview={false}
              className={stepStyles.uploadArea}
              icon={<LuImagePlus className={stepStyles.icon} />}
            />
          )}
        />

        {coverImage && (
          <div className={stepStyles.coverPreview}>
            <img
              src={
                coverImage instanceof File
                  ? URL.createObjectURL(coverImage)
                  : coverImage
              }
              alt="cover"
            />
            <button
              type="button"
              className={stepStyles.removeBtn}
              onClick={() => setValue("coverImage", null)}
            >
              <LuX size={14} />
            </button>
          </div>
        )}
      </div>

      <div className={stepStyles.card}>
        <h4 className={stepStyles.sectionTitle}>Farm Images</h4>

        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <FileInput
              value={null}
              onChange={(files) => {
                const merged = [...(images || []), ...files];
                field.onChange(merged);
              }}
              multiple
              label="Upload farm images"
              hint="Click to browse or drag & drop"
              showPreview={false}
              className={stepStyles.uploadArea}
              icon={<LuImagePlus className={stepStyles.icon} />}
            />
          )}
        />
      </div>

      {images && images.length > 0 && (
        <div className={stepStyles.card}>
          <h4 className={stepStyles.sectionTitle}>Preview</h4>

          <div className={stepStyles.grid}>
            {Array.from(images).map((file, i) => (
              <div key={i} className={stepStyles.imageBox}>
                <img src={URL.createObjectURL(file)} alt="preview" />

                <button
                  type="button"
                  className={stepStyles.removeBtn}
                  onClick={() => handleRemove(i)}
                >
                  <LuX size={14} />
                </button>

                <span className={stepStyles.fileName}>{file.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
