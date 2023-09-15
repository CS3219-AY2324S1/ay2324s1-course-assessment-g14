import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

interface QuestionFormProps {
    onSubmit: (questionData: QuestionData) => void;
}

export interface QuestionData {
    title: string,
    complexity: string,
    description: string,
    constraints: string,
}

const AddQuestionForm : React.FC<QuestionFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        complexity: '',
        description: '',
        constraints: '',
    });

    const complexities = [
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
    ];

    const handleTextInputChange = (e: { target: { id: any; value: any; }; }) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Add Question
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="title"
                            label="Question Title"
                            fullWidth
                            value={formData.title}
                            onChange={handleTextInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="complexity"
                            select
                            label="Complexity"
                            fullWidth
                            value={formData.complexity}
                            onChange={(e) =>
                                setFormData({ ...formData, complexity: e.target.value })
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
                        <TextField
                            required
                            id="description"
                            label="Description"
                            fullWidth
                            multiline
                            minRows={10}
                            maxRows={30}
                            value={formData.description}
                            onChange={handleTextInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="constraints"
                            label="Constraints"
                            multiline
                            fullWidth
                            value={formData.constraints}
                            onChange={handleTextInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
};

export default AddQuestionForm;
