import {
  BookOpenCheck,
  CircleDashed,
  Construction,
  FlaskConical,
  Search,
} from "lucide-react";
import type { ResearchStatus as ResearchStatusType } from "@/content/research";

type ResearchStatusProps = {
  status: ResearchStatusType;
};

const statusIcons = {
  Published: BookOpenCheck,
  "In Progress": FlaskConical,
  Developing: Construction,
  Completed: BookOpenCheck,
  Exploratory: Search,
} satisfies Record<ResearchStatusType, typeof CircleDashed>;

export default function ResearchStatus({ status }: ResearchStatusProps) {
  const Icon = statusIcons[status];

  const statusClass = status.toLowerCase().replaceAll(" ", "-");

  return (
    <span className={`research-status research-status--${statusClass}`}>
      <Icon size={13} strokeWidth={1.9} aria-hidden="true" />
      {status}
    </span>
  );
}