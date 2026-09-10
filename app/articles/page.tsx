import type { Metadata } from "next";
import ArticlesView from "./ArticlesView";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Articles",
  description: `Engineering writing from the ${site.name} team.`,
};

export default function ArticlesPage() {
  return <ArticlesView />;
}
