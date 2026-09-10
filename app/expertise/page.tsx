import type { Metadata } from "next";
import ExpertiseView from "./ExpertiseView";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Expertise",
  description: `The languages, frameworks and infrastructure ${site.name} builds on.`,
};

export default function ExpertisePage() {
  return <ExpertiseView />;
}
