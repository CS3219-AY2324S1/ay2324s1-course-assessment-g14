import React, {useState} from 'react';
import Question from "./Question";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {Box, Card, Paper} from "@mui/material";
import QuestionForm from "./QuestionForm";

interface EditQuestionPreviewProps {
    question: Question;
    onEdit: (question: Question) => void;
    onDelete: (question: Question) => void;
}

const EditQuestionTab: React.FC<EditQuestionPreviewProps> = ({question, onEdit, onDelete}) => {
    const [editQuestion, setEditQuestion] = useState(false);

    const handleStartEdit = () => {
        setEditQuestion(true);
    }

    const handleFinishEdit = (editedQuestion: Question) => {
        onEdit(editedQuestion);
        setEditQuestion(false);
    };

    const handleDelete = () => {
        onDelete(question);
    };

    return (
        <React.Fragment>
            <Box sx={{ marginBottom: 3, padding: 3 }}>
                {editQuestion ?
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom paddingBottom={2}>
                            Edit Question
                        </Typography>
                        <QuestionForm
                            question={question}
                            onSubmit={handleFinishEdit}
                            onCancel={() => setEditQuestion(false)}
                        />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom component="div">
                            {question.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom component="div" sx={{ whiteSpace: 'pre-line'}}>
                            {question.description.split("\\n").map((s, key) => {
                                return <p key={key}>{s}</p>;
                            })}
                        </Typography>
                        <br />
                        {question.constraints.length > 0 &&
                            <React.Fragment>
                                <Typography variant="body1" gutterBottom component="div" sx={{ whiteSpace: 'pre-line'}}>
                                    Constraints:
                                </Typography>
                                <Typography variant="body2" gutterBottom component="div">
                                    {question.constraints.map((constraint, key) => {
                                        return <p key={key}>{constraint}</p>;
                                    })}
                                </Typography>
                            </React.Fragment>
                        }
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button variant="outlined" onClick={handleStartEdit}>
                                    Edit
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                </React.Fragment>
            }
            </Box>
        </React.Fragment>
    );
};

export default EditQuestionTab;
