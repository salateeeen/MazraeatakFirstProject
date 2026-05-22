import { FormProvider, useForm } from "react-hook-form";

import styles from "./Rate.module.css";
import Button from "@/ui/button/Button";
import Stars from "@/ui/stars/Stars";
import TextArea from "@/ui/forms/textArea/TextArea";
import { capitalizeFirstLetter } from "@/utils/handleStrings";
import { useRate } from "../hooks/useRate";
import Title from "@/ui/title/Title";

export default function Rate({farmName, farmId }) {
  const rateForm = useForm({
    defaultValues: {
      rating: 0,
      message: "sultan omar is the best...",
    },
  });

  const ratingValue = rateForm.watch("rating");

  const { mutate: createReview, isPending: isCreatingReview } = useRate();

  function onSubmit(formData) {
    if (!formData.rating) return;
    createReview({ farmId, data: formData });
  }

  return (
    <div>
      <FormProvider {...rateForm}>
        <form
          className={styles.form}
          onSubmit={rateForm.handleSubmit(onSubmit)}
        >
          <div className={styles.header}>
            <header><Title size="lg" mb="0.4rem" className={styles.title}>
              Review <span>{capitalizeFirstLetter(farmName)}</span>
            </Title></header>
            <p className={styles.subtitle}>Tell us what you think about your stay</p>
          </div>

          <div className={styles.starsBox}>
            <Stars size={"1.4rem"} name="rating" readonly={false} />
          </div>

          <TextArea
            className={styles.text}
            placeholder="What did you like? what can be improved?"
            name="message"
          />

          <Button
            type="submit"
            className={styles.submit}
            disabled={!ratingValue}
            isPending={isCreatingReview}
          >
            Submit Review
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
