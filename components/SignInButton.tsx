import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const RedirectDash = () => {
  return (
    <Link href="/dashboard">
      <Button variant="ghost" className="">
        orders
        <ChevronRightIcon className="w-6 text-stone-700" />
      </Button>
    </Link>
  );
};

export default RedirectDash;
