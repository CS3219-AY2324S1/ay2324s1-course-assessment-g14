import React, {useState} from 'react';
import Question from "./Question";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {Autocomplete, Typography} from "@mui/material";
import {QUESTION_CATEGORIES} from "./QuestionCategories";
import {Example} from "../../data/data.context";

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
    const [constraints, setConstraints] = useState<string[]>(
      initialQuestion ? initialQuestion.constraints : []);
    const [examples, setExamples] = useState<Example[]>(
      initialQuestion ? initialQuestion.examples : []);

    const complexities = [
        {value: 'Easy', label: 'Easy'},
        {value: 'Medium', label: 'Medium'},
        {value: 'Hard', label: 'Hard'},
    ];

    const handleTextInputChange = (e: { target: { id: any; value: any; }; }) => {
        let {id, value} = e.target;
        setQuestion((q) => ({
            ...q,
            [id]: value,
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let questionToAdd = {...question};
        questionToAdd.constraints = constraints.filter((constraint) => constraint !== '');
        questionToAdd.examples = examples.filter((example) => example.text !== '' || example.image !== '');
        onSubmit(questionToAdd);
    };

    const handleCancel = () => {
        onCancel();
    };

    const handleAddConstraint = () => {
        setConstraints([...constraints, '']);
    }

    const handleRemoveConstraint = (index: number) => {
        setConstraints(constraints.filter((_, i) => i !== index));
    }

    const handleAddExample = () => {
        setExamples([...examples, {text: '', image: ''}]);
    }

    const handleRemoveExample = (index: number) => {
        setExamples(examples.filter((_, i) => i !== index));
    }

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
                    <Grid container item xs={12} direction={"row"} spacing={3} alignItems={"center"}>
                        <Grid item>
                            <Typography variant="h6">Constraints: {constraints.length}</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={handleAddConstraint}>+</Button>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                        {constraints.map((constraint, index) => (
                            <Grid container item xs={12} direction={"row"} spacing={3} alignItems={"center"} key={index}>
                                <Grid item xs={10}>
                                    <TextField
                                        id={"constraint" + (index+1)}
                                        label={"Constraint " + (index + 1)}
                                        fullWidth
                                        value={constraint}
                                        onChange={(e) => {
                                            let updatedConstraints = [...constraints];
                                            updatedConstraints[index] = e.target.value;
                                            setConstraints(updatedConstraints);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained" onClick={() => handleRemoveConstraint(index)}>-</Button>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid container item xs={12} direction={"row"} spacing={3} alignItems={"center"}>
                        <Grid item>
                            <Typography variant="h6">Examples: {examples.length}</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={handleAddExample}>+</Button>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                        {examples.map((example, index) => (
                          <Grid container item xs={12} direction={"row"} spacing={3} alignItems={"center"} key={index}>
                              <Grid container item xs={10} spacing={1} alignItems={"center"}>
                                  <Grid item xs={12}>
                                      <TextField
                                        id={"example" + (index+1) + "text"}
                                        label={"Example " + (index + 1) + " Text"}
                                        fullWidth
                                        value={example.text}
                                        onChange={(e) => {
                                            let updatedExamples = [...examples];
                                            updatedExamples[index].text = e.target.value;
                                            setExamples(updatedExamples);
                                        }}
                                      />
                                  </Grid>
                                  <Grid item xs={12}>
                                      <TextField
                                        id={"example" + (index+1) + "image"}
                                        label={"Example " + (index + 1) + " Image"}
                                        fullWidth
                                        value={example.image}
                                        onChange={(e) => {
                                            let updatedExamples = [...examples];
                                            updatedExamples[index].image = e.target.value;
                                            setExamples(updatedExamples);
                                        }}
                                      />
                                  </Grid>
                              </Grid>
                              <Grid item xs={2}>
                                  <Button variant="contained" onClick={() => handleRemoveExample(index)}>-</Button>
                              </Grid>
                          </Grid>
                        ))}
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
