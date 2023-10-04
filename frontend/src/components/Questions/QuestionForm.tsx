import React, {useState} from 'react';
import Question from "./Question";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {Autocomplete} from "@mui/material";
import {QUESTION_CATEGORIES} from "./QuestionCategories";

interface QuestionFormProps {
    question?: Question;
    onSubmit: (question: Question) => void;
    onCancel: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({question:initialQuestion, onSubmit, onCancel}) => {
    const [question, setQuestion] = useState(
        initialQuestion ? initialQuestion :
            new Question({
                difficulty: 'Easy',
            }));

    const complexities = [
        {value: 'Easy', label: 'Easy'},
        {value: 'Medium', label: 'Medium'},
        {value: 'Hard', label: 'Hard'},
    ];

    const handleTextInputChange = (e: { target: { id: any; value: any; }; }) => {
        const {id, value} = e.target;
        setQuestion((q) => ({
            ...q,
            [id]: value,
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        onSubmit(question);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <React.Fragment>
            <form>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item sm={6}>
                        <TextField
                            required
                            id="title"
                            label="Question Title"
                            fullWidth
                            value={question.title}
                            onChange={handleTextInputChange}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            required
                            id="difficulty"
                            select
                            label="Difficulty"
                            fullWidth
                            value={question.difficulty}
                            onChange={(e) =>
                                setQuestion({...question, difficulty: e.target.value})
                            }
                        >
                            {complexities.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            id="categories-outlined"
                            options={QUESTION_CATEGORIES}
                            limitTags={5}
                            filterSelectedOptions
                            value={question.categories}
                            onChange={(event: any, updatedCategories: string[]) => {
                                setQuestion({...question, categories: updatedCategories})
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Categories"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="description"
                            label="Description"
                            fullWidth
                            multiline
                            minRows={10}
                            maxRows={30}
                            value={question.description}
                            onChange={handleTextInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="constraints"
                            label="Constraints"
                            multiline
                            fullWidth
                            value={question.constraints}
                            onChange={handleTextInputChange}
                        />
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item>
                            <Button variant="contained" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
};

export default QuestionForm;
