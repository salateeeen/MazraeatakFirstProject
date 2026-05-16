import { useFormContext } from "react-hook-form";
import { capitalizeFirstLetter } from "@utils/handleStrings";
import styles from "../Form.module.css";
import inputStyles from "./Input.module.css";
import React from "react";

export default function Input({
  ref,
  type = "text",
  list,
  className,
  noRegister = false,
  readOnly = false,
  required = false,
  pattern,
  validate,
  autoComplete,
  name,
  placeholder = name,
  label = name,
  onBlur,
  onClick,
  onKeyDown,
  onChange,
  display = "column",
  value,
  children,
  hidden,
}) {
  
  const form = useFormContext();
  const register = form ? form.register : () => ({});
  const { formState } = form || { formState: { errors: {} } };
  const error = formState?.errors?.[name];
  
  const displaySpan = display === "row" ? styles.row : styles.column;
  
  const registerOptions = {};
  if (required) registerOptions.required = typeof required === "string" ? required : `${label || name} is required`;
  if (pattern) registerOptions.pattern = pattern;
  if (validate) registerOptions.validate = validate;

  const registerResult = !noRegister && form && name ? register(name, registerOptions) : {};

  const styledChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const mergedClassName = `${child.props.className || ""} ${
      inputStyles.icon
    }`;
    return React.cloneElement(child, { className: mergedClassName });
  });

  return (
    <div className={`${styles.container} ${displaySpan}`}>
      {label && <label className={styles.label}>{`${capitalizeFirstLetter(label)}`}</label>}
      <div className={`${inputStyles.composition}`}>
        <input
          className={`${styles.input} ${inputStyles.input} ${error ? inputStyles.error : ""} ${className}`}
          type={type}
          list={list}
          hidden={hidden}
          placeholder={placeholder}
          {...registerResult}
          readOnly={readOnly}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onClick={onClick}
          onChange={(e) => {
            registerResult.onChange?.(e);
            onChange?.(e);
          }}
          ref={(el) => {
            if (registerResult && typeof registerResult.ref === "function") {
              registerResult.ref(el);
            }
            if (ref) {
              ref.current = el;
            }
          }}
          autoComplete={autoComplete}
          {...(type !== "file" ? { value } : {})}
        />
        {styledChildren}
      </div>
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
}
