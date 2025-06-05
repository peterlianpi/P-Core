import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
// import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

const appName = process.env.NEXT_PUBLIC_APP_NAME || "P-Core";

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-lg font-semibold", font.className)}>{appName}</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
