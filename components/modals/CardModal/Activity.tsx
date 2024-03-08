"use client";

import ActivityItem from "@/components/ActivityItem";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

type ActivityPropTypes = {
  items: AuditLog[];
};

const Activity = ({ items }: ActivityPropTypes) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div>
        <p className="font-semibold text-neutral-700 mb-2">Activity</p>
        <ol className="mt-2 space-y-4">
          {items.map((item) => (
            <ActivityItem key={item.id} item={item} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeletonFunction() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};

export default Activity;
