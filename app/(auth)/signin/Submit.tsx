import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";
const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      variant="default"
      // size={"sm"}
      className="mt-4 w-full"
    >
      {pending ? "Signing..." : "Sign In"}
    </Button>
  );
};

export default Submit;
