"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { OrganizationResource } from "@clerk/types";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
type SidebarItemPropType = {
  isExpanded: boolean;
  isActive: boolean;
  org: OrganizationResource;
  onExpand: (id: string) => void;
};

export const SidebarItem = ({
  isActive,
  isExpanded,
  onExpand,
  org,
}: SidebarItemPropType) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: "Board",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/org/${org.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/org/${org.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/org/${org.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/org/${org.id}/billing`,
    },
  ];

  const onClickHandler = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={org.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(org.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              src={org.imageUrl}
              alt={org.name}
              fill
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm">{org.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            onClick={() => onClickHandler(route.href)}
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1",
              pathname === route.href && "bg-sky-500/10 text-sky-700"
            )}
            variant="ghost"
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
