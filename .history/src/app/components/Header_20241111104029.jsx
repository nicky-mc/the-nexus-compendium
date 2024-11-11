import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <div>
      <SignIn />
      <SignOutButton />
    </div>
  );
}
