import AuthLayout from "../components/AuthLayout";
import SignUpForm from "../forms/SignUpForm";

export default function SignUp() {
  return (
    <AuthLayout title="Sign Up">
      <SignUpForm />
    </AuthLayout>
  );
}
