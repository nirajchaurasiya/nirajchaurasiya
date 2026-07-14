import {
  Archive,
  CircleDashed,
  FileCheck2,
} from "lucide-react";
import type {
  WritingStatus as WritingStatusType,
} from "@/content/writing";

type WritingStatusProps = {
  status: WritingStatusType;
};

const statusIcons = {
  Published: FileCheck2,
  Draft: CircleDashed,
  Archived: Archive,
} satisfies Record<
  WritingStatusType,
  typeof FileCheck2
>;

export default function WritingStatus({
  status,
}: WritingStatusProps) {
  const Icon = statusIcons[status];

  return (
    <span
      className={`writing-status writing-status--${status.toLowerCase()}`}
    >
      <Icon
        size={13}
        strokeWidth={1.9}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}