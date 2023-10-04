import React from "react";
import EditQuestionsTable from "./EditQuestionsTable";
import {Box, Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import Question from "./Question";


const EditQuestionsTab: React.FC = () => {
    const [editQuestions, setEditQuestions] = React.useState(false);

    const handleStartEdit = () => {
        setEditQuestions(true);
    }
    const handleStopEdit = () => {
        setEditQuestions(false);
    };

    const onEdit = (editedQuestion: Question) => {
        console.log("Edited Question: ", editedQuestion);

        //TODO: Update question in database
    }

    const onDelete = (questionToDelete: Question) => {
        console.log("Question to Delete: ", questionToDelete);

        //TODO: Delete question from database
    }


    return (
        <React.Fragment>
            <Box component="span" padding={2} width='80%'>
                {editQuestions ?
                    <React.Fragment>
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