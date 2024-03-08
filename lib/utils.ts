import { ACTION, AuditLog } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const generateLogMessage = (props: AuditLog) => {
  const { action, entityType, entityTitle } = props;
  switch (action) {
    case ACTION.CREATE:
      return `created ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `updated ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `deleted ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
    default:
      return `unknown action ${entityType.toLocaleLowerCase()} "${entityTitle}"`;
  }
};
