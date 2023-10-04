import React from "react";
import AddQuestionForm from "./AddQuestionForm";
import {Box, Button} from "@mui/material";
import Question from "./Question";


const AddQuestionTab: React.FC = () => {
    const [addQuestions, setAddQuestions] = React.useState(false);

    const handleAddQuestionClick = () => {
        setAddQuestions(true);
    }

    const onCancel = () => {
        setAddQuestions(false);
    }

    const onSubmit = (question: Question) => {
        console.log(question);
        setAddQuestions(false);
    };

    return (
        <React.Fragment>
            <Box component="span" padding={2} width='80%'>
                {addQuestions ?
                    <AddQuestionForm onSubmit={onSubmit} onCancel={onCancel} />
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