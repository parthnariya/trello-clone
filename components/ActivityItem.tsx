import { AuditLog } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { generateLogMessage } from "@/lib/utils";
import { format } from "date-fns";
const ActivityItem = ({ item }: { item: AuditLog }) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={item.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {item.userName}
          </span>
          {generateLogMessage(item)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(item.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};

export default ActivityItem;
