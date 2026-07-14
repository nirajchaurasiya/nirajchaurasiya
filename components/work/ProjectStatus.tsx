import { CircleDot } from "lucide-react";
import type { ProjectStatus as ProjectStatusType } from "@/content/projects";

type ProjectStatusProps = {
  status: ProjectStatusType;
};

function createStatusClass(status: ProjectStatusType) {
  return status.toLowerCase().replaceAll(" ", "-");
}

export default function ProjectStatus({ status }: ProjectStatusProps) {
  return (
    <span
      className={`project-status project-status--${createStatusClass(status)}`}
    >
      <CircleDot size={12} strokeWidth={2.1} aria-hidden="true" />
      {status}
    </span>
  );
}