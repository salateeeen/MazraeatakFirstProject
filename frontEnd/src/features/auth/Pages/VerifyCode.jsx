import AuthLayout from "../components/AuthLayout";
import VerifyCodeForm from "../forms/VerifyCodeForm";

export default function VerifyCode() {
  return (
    <AuthLayout title="Verification Code">
      <VerifyCodeForm />
    </AuthLayout>
  );
}
