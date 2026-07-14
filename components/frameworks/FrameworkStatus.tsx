import {
  Archive,
  CircleDot,
  Construction,
} from "lucide-react";
import type {
  FrameworkStatus as FrameworkStatusType,
} from "@/content/frameworks";

type FrameworkStatusProps = {
  status: FrameworkStatusType;
};

const statusIcons = {
  Active: CircleDot,
  Developing: Construction,
  Archived: Archive,
} satisfies Record<
  FrameworkStatusType,
  typeof CircleDot
>;

export default function FrameworkStatus({
  status,
}: FrameworkStatusProps) {
  const Icon = statusIcons[status];

  return (
    <span
      className={`framework-status framework-status--${status.toLowerCase()}`}
    >
      <Icon size={13} strokeWidth={1.9} aria-hidden="true" />
      {status}
    </span>
  );
}