import React from "react";
import EditQuestionsTable from "./EditQuestionsTable";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Question from "./Question";
import { deleteQuestion, updateQuestion } from "../../api/questions/data";
import { AxiosError } from "axios";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../auth/auth.context";

const EditQuestionsTab: React.FC = () => {
  const { user } = useAuth();
  const [editQuestions, setEditQuestions] = React.useState(false);

  const handleStartEdit = () => {
    setEditQuestions(true);
  };
  const handleStopEdit = () => {
    setEditQuestions(false);
  };

  const onEdit = async (editedQuestion: Question) => {
    console.log("Edited Question: ", editedQuestion);

    try {
      if (user) {
        await updateQuestion(editedQuestion.id, {
          ...editedQuestion,
          token: user.token,
        });
        console.log(
          `Question ${editedQuestion.id} updated: ${editedQuestion.title}`
        );
        setEditQuestions(false);
        window.location.reload();
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        console.log(e.response.data.code);
      } else if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };
  const onDelete = async (questionToDelete: Question) => {
    console.log("Question to Delete: ", questionToDelete);

    try {
      if (user) {
        await deleteQuestion(questionToDelete.id, user.token);
        console.log(
          `Question ${questionToDelete.id} deleted: ${questionToDelete.title}`
        );
        setEditQuestions(false);
        window.location.reload();
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        console.log(e.response.data.code);
      } else if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  return (
    <Box component="span" padding={2} width="80%">
      {editQuestions ? (
        <React.Fragment>
          <Typography variant="h5" gutterBottom>
            Edit Questions
          </Typography>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <EditQuestionsTable onEdit={onEdit} onDelete={onDelete} />
            </Grid>
            <Grid item sm={12}>
              <Button variant="contained" onClick={handleStopEdit}>
                Finish Editing
              </Button>
            </Grid>
          </Grid>
        </React.Fragment>
      ) : (
        <Button variant="contained" onClick={handleStartEdit}>
          Edit Questions
        </Button>
      )}
    </Box>
  );
};

export default EditQuestionsTab;
