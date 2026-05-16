import AuthLayout from "../components/AuthLayout";
import ResetPasswordForm from "../forms/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <AuthLayout title="Set New Password">
      <ResetPasswordForm />
    </AuthLayout>
  );
}
