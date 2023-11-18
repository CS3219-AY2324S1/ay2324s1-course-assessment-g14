import { Example } from "../../data/data.context";

export interface QuestionDTO {
  title: string;
  tags: string[];
  categories: string[];
  constraints: string[];
  difficulty: string;
  description: string;
  examples: Example[];
}
