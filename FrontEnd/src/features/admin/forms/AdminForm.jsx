import { useForm, FormProvider } from "react-hook-form";
import Input from "@/ui/forms/input/Input";
import Button from "@/ui/button/Button";
import styles from "./AdminForm.module.css";
import Title from "@/ui/title/Title";

export default function AdminForm({ 
  defaultValues, 
  onSubmit, 
  title, 
  fields = [], 
  isLoading,
  isEdit = false,
}) {
  const methods = useForm({ defaultValues });

  return (
    <div className={styles.container}>
      {title && <header><Title size="md" mb="1.5rem">{title}</Title></header>}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.fields}>
            {fields.map((field) => (
              <div key={field.name} className={styles.fieldGroup}>
                <Input 
                  name={field.name} 
                  label={field.label}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  required
                  {...field.validation}
                />
              </div>
            ))}
          </div>
          <div className={styles.actions}>
            <Button type="submit" isPending={isLoading}>
              {isEdit ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
