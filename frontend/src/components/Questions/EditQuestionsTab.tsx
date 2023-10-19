import React from "react";
import EditQuestionsTable from "./EditQuestionsTable";
import {Box, Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import Question from "./Question";
import {deleteQuestion, updateQuestion} from "../../api/questions/data";
import {AxiosError} from "axios";
import Typography from "@mui/material/Typography";


const EditQuestionsTab: React.FC = () => {
    const [editQuestions, setEditQuestions] = React.useState(false);

    const handleStartEdit = () => {
        setEditQuestions(true);
    }
    const handleStopEdit = () => {
        setEditQuestions(false);
    };

    const onEdit = async (editedQuestion: Question) => {
        console.log("Edited Question: ", editedQuestion);

        try {
            await updateQuestion(editedQuestion.id, editedQuestion);
            console.log(`Question ${editedQuestion.id} updated: ${editedQuestion.title}`);
            setEditQuestions(false);
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                console.log(e.response.data.code);
            } else if (e instanceof Error) {
                console.log(e.message);
            }
        }
    }

    const onDelete = async (questionToDelete: Question) => {
        console.log("Question to Delete: ", questionToDelete);

        try {
            await deleteQuestion(questionToDelete.id);
            console.log(`Question ${questionToDelete.id} deleted: ${questionToDelete.title}`);
            setEditQuestions(false);
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                console.log(e.response.data.code);
            } else if (e instanceof Error) {
                console.log(e.message);
            }
        }
    }


    return (
        <React.Fragment>
            <Box component="span" padding={2} width='80%'>
                {editQuestions ?
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            Edit Questions
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item sm={12}>
                                <EditQuestionsTable onEdit={onEdit} onDelete={onDelete}/>
                            </Grid>
                            <Grid item sm={12}>
                                <Button variant="contained" onClick={handleStopEdit}>
                                    Finish Editing
                                </Button>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                    :
                    <Button variant="contained" onClick={handleStartEdit}>
                        Edit Questions
                    </Button>
                }
            </Box>
        </React.Fragment>
    );
}

export default EditQuestionsTab;