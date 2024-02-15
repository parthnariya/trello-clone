"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { Sidebar } from "./Sidebar";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { value, toggle, setFalse, setTrue } = useBoolean();
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setFalse();
  }, [setFalse, pathname]);

  /* reason to add this condition :- 
    - every component will run as server component initial in server side
    - when they encounter useEffect then it will be a client component because useEffect only run in client side.
    - so this component will only run in client side */
  if (!mounted) {
    return null;
  }
  return (
    <>
      <Button
        className="block md:hidden mr-2"
        onClick={() => setTrue()}
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={value} onOpenChange={() => setFalse()}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};
