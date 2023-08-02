import { formatDistanceToNow, parseISO } from "date-fns";

export function formatTimeAgo(createdAt) {
  const now = new Date();
  const createdAtDate = parseISO(createdAt);

  return formatDistanceToNow(createdAtDate, { addSuffix: true });
}
