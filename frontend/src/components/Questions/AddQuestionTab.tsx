import React from "react";
import QuestionForm from "./QuestionForm";
import {Box, Button} from "@mui/material";
import Question from "./Question";
import Typography from "@mui/material/Typography";


const AddQuestionTab: React.FC = () => {
    const [addQuestions, setAddQuestions] = React.useState(false);

    const handleAddQuestionClick = () => {
        setAddQuestions(true);
    }
    const onSubmit = (question: Question) => {
        // TODO: Add question to database
        console.log(question);
        setAddQuestions(false);
    };

    const onCancel = () => {
        setAddQuestions(false);
    }


    return (
        <React.Fragment>
            <Box component="span" padding={2} width='80%'>
                {addQuestions ?
                    <React.Fragment>
                        <Typography variant="h4" gutterBottom>
                            Add Question
                        </Typography>
                        <QuestionForm onSubmit={onSubmit} onCancel={onCancel} />
                    </React.Fragment>
                    :
                    <Button variant="contained" onClick={handleAddQuestionClick}>
                        Add Question
                    </Button>
                }
            </Box>
        </React.Fragment>
            );
}

export default AddQuestionTab;