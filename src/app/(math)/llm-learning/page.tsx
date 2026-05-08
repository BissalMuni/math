import { llmLearning } from "@/book/llm-learning";
import { CategoryOverview } from "@/components/content/category-overview";

export default function LlmLearnPage() {
  return <CategoryOverview book={llmLearning} />;
}
