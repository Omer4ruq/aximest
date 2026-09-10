import type { Metadata } from "next";
import ProjectsView from "./ProjectsView";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Platforms, protocols and products shipped by ${site.name}.`,
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
