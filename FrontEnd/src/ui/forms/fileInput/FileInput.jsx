import { useRef, useState, useCallback } from "react";
import styles from "./FileInput.module.css";
import { LuImagePlus, LuX } from "react-icons/lu";

export default function FileInput({
  value,
  onChange,
  multiple = false,
  accept = "image/*",
  label = "Upload file",
  hint = "Click or drag & drop",
  showPreview = true,
  onRemove,
  className = "",
  icon = <LuImagePlus className={styles.icon} />,
  children,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  
  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);
  
  const handleChange = useCallback(
    (e) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      
      if (multiple) {
        onChange(Array.from(files));
      } else {
        onChange(files[0]);
      }
      e.target.value = "";
    },
    [multiple, onChange],
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const files = e.dataTransfer.files;
      if (!files || files.length === 0) return;

      if (multiple) {
        onChange(Array.from(files));
      } else {
        onChange(files[0]);
      }
    },
    [multiple, onChange],
  );
  
  const valueIsArray = Array.isArray(value);
  const valueIsFileList = value instanceof FileList;
  
  let filesArray = [];
  if (value) {
    if (valueIsArray) filesArray = value;
    else if (valueIsFileList) filesArray = Array.from(value);
    else filesArray = [value];
  }



  return (
    <div>
      <div
        className={`${styles.uploadArea} ${dragging ? styles.dragging : ""} ${className}`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {children ? (
          children
        ) : (
          <>
            {icon}
            <p className={styles.label}>{label}</p>
            <span className={styles.hint}>{hint}</span>
          </>
        )}
      </div>

      <input
        type="file"
        hidden
        ref={inputRef}
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />

      {showPreview && filesArray.length > 0 && (
        <div className={styles.previewGrid}>
          {filesArray.map((file, i) => (
            <div key={i} className={styles.previewItem}>
              <img
                src={file instanceof File ? URL.createObjectURL(file) : file}
                alt="preview"
              />

              {onRemove && (
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(i);
                  }}
                >
                  <LuX size={12} />
                </button>
              )}

              {file instanceof File && (
                <span className={styles.fileName}>{file.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
