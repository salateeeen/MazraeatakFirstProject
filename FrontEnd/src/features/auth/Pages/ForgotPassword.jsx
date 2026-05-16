import AuthLayout from "../components/AuthLayout";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <AuthLayout title="Find your account">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
