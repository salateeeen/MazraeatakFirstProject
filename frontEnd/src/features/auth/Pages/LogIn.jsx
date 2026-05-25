import AuthLayout from "../components/AuthLayout";
import LogInForm from "../forms/LogInForm";

export default function LogIn() {
  return (
    <AuthLayout title="Login">
      <LogInForm />
    </AuthLayout>
  );
}
