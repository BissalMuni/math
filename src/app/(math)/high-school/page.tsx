import { highSchool } from "@/book/high-school";
import { CategoryOverview } from "@/components/content/category-overview";

export default function HighSchoolPage() {
  return <CategoryOverview book={highSchool} />;
}
