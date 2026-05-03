import { llmLearning } from "@/structure/llm-learning";
import { CategoryOverview } from "@/components/content/category-overview";

export default function LlmLearnPage() {
  return <CategoryOverview category={llmLearning} />;
}
