import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../public/font.woff2",
});

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-70 transition items-center justify-center gap-x-2 hidden md:flex">
        <Image src={"/logo.svg"} alt="Taskify" width={30} height={30} />
        <p
          className={cn("text-lg text-neutral-700 pb-1", headingFont.className)}
        >
          Taskify
        </p>
      </div>
    </Link>
  );
};

export default Logo;
