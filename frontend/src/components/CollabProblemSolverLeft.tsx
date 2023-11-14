import { useEffect } from "react";
import { Paper, Typography, Divider, CardMedia } from "@mui/material";
import { useData } from "../data/data.context";
import htmr from "htmr";
import {decode} from "html-entities";
import {parseHtmlDescription} from "../utils/utils";

function CollabProblemSolverLeft({
  questionNumber,
}: {
  questionNumber: string;
}) {
  const questionId = questionNumber;
  const { questions } = useData();

  // Find the question that matches the questionId
  const question = questions.find((q) => q.id === questionId);
  console.log(question);
  useEffect(() => {
    // Fetch initial code or other data as needed
    // You can set the initial code or other data here
    // For example, setCode(question?.initialCode || '');
  }, [question]);

  if (!question) {
    // If the question is not found, display a message
    return (
      <Paper
        elevation={3}
        sx={{ flex: 1, display: "flex", flexDirection: "column", padding: 2 }}
      >
        <Typography variant="h4" gutterBottom>
          Question not found
          {questionId}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{ flex: 1, display: "flex", flexDirection: "column", padding: 2 }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontSize: "24px" }}>
        {question.title}
      </Typography>
      <Divider sx={{ marginBottom: 2, marginTop: 5 }} />
      <Typography variant="body1" sx={{ marginBottom: 2, fontSize: "18px", overflowX: 'auto' }}>
        {parseHtmlDescription(question.description)}
      </Typography>
      <Divider sx={{ marginBottom: 10 }} />
      <Typography variant="h6" gutterBottom sx={{ fontSize: "18px" }}>
        Examples:
      </Typography>
      {question.examples.map((example, index) => (
        <div key={example.text}>
          <Typography variant="body2" sx={{ fontSize: "18px" }}>
            {example.text}
          </Typography>
          {example.image && (
            <CardMedia
              component="img"
              alt={`Example ${index + 1}`}
              sx={{ maxHeight: "100%", width: "auto" }}
              height="140"
              image={example.image}
            />
          )}
          <br />
        </div>
      ))}
    </Paper>
  );
}

export default CollabProblemSolverLeft;
