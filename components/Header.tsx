import { auth } from "@/auth";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import RedirectDash from "./SignInButton";

const Header = async () => {
  const session = await auth();

  return (
    <header className="py-4">
      <div className="container max-w-4xl flex items-center justify-between">
        <Link href="/">LOGO</Link>

        <div className="flex items-center gap-3 py-1">
          {session ? <SignOutButton /> : <RedirectDash />}
        </div>
      </div>
    </header>
  );
};

export default Header;
