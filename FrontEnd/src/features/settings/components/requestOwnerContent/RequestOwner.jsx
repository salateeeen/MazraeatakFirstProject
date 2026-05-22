import { useForm, FormProvider } from "react-hook-form";
import { useRequestOwner } from "@/features/owners/hooks/useRequestOwner";
import { useMyOwnerRequest } from "@/features/owners/hooks/useMyOwnerRequest";
import Button from "@/ui/button/Button";
import Input from "@/ui/forms/input/Input";
import TextArea from "@/ui/forms/textArea/TextArea";
import Spinner from "@/ui/spinner/Spinner";
import { LuUser } from "react-icons/lu";
import styles from "./RequestOwner.module.css";

export default function RequestOwner() {
  const methods = useForm({
    defaultValues: {
      businessName: "",
      phone: "",
      experience: "",
      socialMedia: "",
      description: "",
    },
  });

  const { mutate, isPending } = useRequestOwner();
  const { data: requestData, isPending: fetchingRequest } = useMyOwnerRequest();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        methods.reset();
      },
    });
  };

  if (fetchingRequest) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><Spinner /></div>;
  }

  const status = requestData?.data?.verificationStatus;

  if (status === "pending") {
    return (
      <div className={styles.statusContainer}>
        <div className={styles.iconPending}>
          <LuUser size={64} />
        </div>
        <h2 className={styles.statusTitle}>Under Review</h2>
        <p className={styles.statusDesc}>
          Your owner account request has been submitted and is currently under review by our team. We will get back to you shortly!
        </p>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className={styles.statusContainer}>
        <div className={styles.iconRejected}>
          <LuUser size={64} />
        </div>
        <h2 className={styles.statusTitle}>Request Rejected</h2>
        <p className={styles.statusDesc}>
          Unfortunately, your recent request for an owner account was rejected. Please contact our support team if you believe this is a mistake or if you need further details.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={styles.grid}>
            <Input
              name="businessName"
              label="Business Name"
              placeholder="Enter your business name"
              required
            />
            <Input
              name="phone"
              label="Phone Number"
              placeholder="e.g. +962 7XXXXXXXX"
              required
            />
          </div>
          
          <Input
            name="experience"
            label="Experience"
            placeholder="Briefly describe your experience in managing farms"
            required
          />
          
          <Input
            name="socialMedia"
            label="Social Media Link"
            placeholder="e.g. Facebook, Instagram, or LinkedIn profile"
          />
          
          <div className={styles.textareaGroup}>
            <label className={styles.label}>Additional Description</label>
            <TextArea
              name="description"
              placeholder="Anything else you want us to know?"
              className={styles.textarea}
            />
          </div>

          <Button isPending={isPending} type="submit" className={styles.submitBtn}>
            Submit Request
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
