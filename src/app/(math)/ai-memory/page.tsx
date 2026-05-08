import { aiMemory } from "@/book/ai-memory";
import { CategoryOverview } from "@/components/content/category-overview";

export default function AiMemoryPage() {
  return <CategoryOverview book={aiMemory} />;
}
