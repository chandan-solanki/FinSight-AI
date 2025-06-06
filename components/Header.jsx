import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="bg-amber-200 px-2 py-5 border-b text-center border-gray-200">
      <SignedOut>
        <SignInButton />
        <SignUpButton/>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;
