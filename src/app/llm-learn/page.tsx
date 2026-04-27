import { llmLearning } from "@/data/llm-learning";
import { CategoryOverview } from "@/components/category-overview";

export default function LlmLearnPage() {
  return <CategoryOverview category={llmLearning} />;
}
