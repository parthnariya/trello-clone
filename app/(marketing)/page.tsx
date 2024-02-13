/* direct imports */
import { Medal } from "lucide-react";
import Link from "next/link";

/* import through alias */
import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex items-center border shadow-sm p-4 rounded-full bg-amber-100 text-amber-700 uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task management
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Taskify helps team move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 w-fit rounded-md">
          work forward.
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        facere necessitatibus suscipit tenetur harum aspernatur repellat,
        maxime, culpa minus veritatis similique in officiis accusantium!
        Doloremque laudantium eligendi tenetur.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get Taskify for free</Link>
      </Button>
    </div>
  );
}
