import Link from "next/link";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-0.5 mr-12 shrink-0 lg:mr-0 lg:shrink">
          <Image
            src="/logo-circle.svg"
            alt="StreamHub"
            height="40"
            width="40"
          />
        </div>
        <div className={cn(
            "hidden lg:block",
            font.className
          )}>
          <p className="text-lg font-semibond">
            StreamHub
          </p>
          <p className="text-xs text-muted-foreground">
            Creator dashboard
          </p>
        </div>
      </div>
    </Link>
  );
};
