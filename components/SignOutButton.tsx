import { signOut } from "@/auth";
import { Button } from "./ui/button";

const SignOutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button variant="outline" className="rounded border px-1">
        Sign Out
      </Button>
    </form>
  );
};

export default SignOutButton;
