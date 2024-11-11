import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <h1>Sign in please</h1>
      <SignIn />
    </>
  );
}
