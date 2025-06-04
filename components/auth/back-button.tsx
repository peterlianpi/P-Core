"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(href);
  };

  return (
    <Button
      variant="link"
      className="font-normal w-full"
      size="sm"
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};
