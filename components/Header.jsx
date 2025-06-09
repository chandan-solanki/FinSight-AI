import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, LucideLayoutDashboard, PenBox } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full bg-white/50 backdrop-blur-md top-0 fixed border-b z-50 px-4">
      <nav className="flex justify-between items-center py-2">
        <Link href={"/"} className="">
          <Image
            src={"/logo (2).png"}
            width={500}
            height={500}
            alt="FinSight AI Logo"
            className="h-20 max-lg:h-12 w-auto object-cover"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link
              href={"/dashboard"}
              className="text-gray-600 hover:text-blue-800
            flex item-center gap-2 cursor-pointer"
            >
              <Button className={"cursor-pointer"} variant={"ghost"}>
                <LayoutDashboard />
                <span className="max-md:hidden ">Dashboard</span>
              </Button>
            </Link>

            <Link
              href={"/transaction/create"}
              className="text-gray-600 hover:text-blue-800
            flex item-center gap-2 cursor-pointer"
            >
              <Button className={"cursor-pointer"}>
                <PenBox />
                <span className="max-md:hidden">Transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button className={"cursor-pointer"} variant={"outline"}>
                Login
              </Button>
            </SignInButton>
            {/* <SignUpButton>
              <Button className={"cursor-pointer"} variant={"ghost"}>
                Sign Up
              </Button>
            </SignUpButton> */}
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    width: "2.5rem",
                    height: "2.5rem",
                  },
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Header;
