import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import { Box, Button } from "@mui/material";
import Question from "./Question";
import Typography from "@mui/material/Typography";
import { addQuestion } from "../../api/questions/data";
import { AxiosError } from "axios";

const AddQuestionTab: React.FC = () => {
  const [addQuestions, setAddQuestions] = useState(false);

  const handleAddQuestionClick = () => {
    setAddQuestions(true);
  };
  const onSubmit = async (question: Question) => {
    console.log(question);
    let questionToAdd = new Question(question);

    try {
      const questionAdded = await addQuestion(questionToAdd);
      console.log(questionAdded);
      setAddQuestions(false);

      // Navigate to the current location to refresh the page
      window.location.reload();
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        console.log(e.response.data.code);
      } else if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  const onCancel = () => {
    setAddQuestions(false);
  };

  return (
    <Box component="span" padding={2} width="80%">
      {addQuestions ? (
        <React.Fragment>
          <Typography variant="h5" gutterBottom>
            Add Question
          </Typography>
          <QuestionForm onSubmit={onSubmit} onCancel={onCancel} />
        </React.Fragment>
      ) : (
        <Button variant="contained" onClick={handleAddQuestionClick}>
          Add Question
        </Button>
      )}
    </Box>
  );
};

export default AddQuestionTab;