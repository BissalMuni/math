import { powershell } from "@/book/powershell";
import { CategoryOverview } from "@/components/content/category-overview";

export default function PowershellPage() {
  return <CategoryOverview book={powershell} />;
}
