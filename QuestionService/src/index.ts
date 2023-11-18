import express from "express";
import cors from "cors";

import { handleGetQuestions, handleAddQuestion, handleUpdateQuestion, handleDeleteQuestion } from "./question/question.controller";
const app = express();
const port = 3002;  

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get("/questions", handleGetQuestions);
app.post("/questions", handleAddQuestion)
app.put("/questions/:questionId", handleUpdateQuestion)
app.delete("/questions/:questionId", handleDeleteQuestion)

app.listen(port, () => {
  console.log(`Question Service listening on port ${port}`);
});
