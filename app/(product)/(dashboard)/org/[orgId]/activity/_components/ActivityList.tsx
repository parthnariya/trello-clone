import ActivityItem from "@/components/ActivityItem";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const ActivityList = async () => {
  const { orgId } = auth();
  if (!orgId) redirect("/select-org");

  const auditLogs = await prisma.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <ol className="space-y-4 mt-4">
      {auditLogs.length === 0 && (
        <p className="block text-xs text-center text-muted-foreground">
          No activity found
        </p>
      )}
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} item={log} />
      ))}
    </ol>
  );
};
ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
    </ol>
  );
};
