// ProblemSolver.tsx
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';

const languages: string[] = ['C++', 'Java', 'JavaScript', 'Python'];

const problemSolverStyle: React.CSSProperties = {
  height: '100vh', // Set the height to 100% of viewport height
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
};

function ProblemSolver() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');
  const [code, setCode] = useState<string>('');

  // Dummy question data (replace with actual data from Firestore)
  const question = {
    title: 'Sample Coding Problem',
    description: 'Write a function that adds two numbers.',
    examples: [
      { input: '1, 2', output: '3' },
      { input: '5, 7', output: '12' },
    ],
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedLanguage(event.target.value as string);
  };

  const handleCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCode(event.target.value);
  };

  const handleSubmit = () => {
    // Handle code submission here (e.g., send to backend for evaluation)
    console.log(`Selected Language: ${selectedLanguage}`);
    console.log(`Code: ${code}`);
  };

  return (
    <Container style={problemSolverStyle}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h5" gutterBottom>
              {question.title}
            </Typography>
            <Typography variant="body1">
              {question.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Examples:
            </Typography>
            {question.examples.map((example, index) => (
              <div key={index}>
                <Typography variant="body2">
                  Input: {example.input}
                </Typography>
                <Typography variant="body2">
                  Output: {example.output}
                </Typography>
                <br />
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Select a Language:
            </Typography>
            <TextField
              select
              fullWidth
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {languages.map((language, index) => (
                <MenuItem key={index} value={language}>
                  {language}
                </MenuItem>
              ))}
            </TextField>
            <Typography
              variant="h6"
              gutterBottom
              style={{ marginTop: '16px' }}
            >
              Code Editor:
            </Typography>
            <TextField
              multiline
              fullWidth
              variant="outlined"
              rows={10}
              value={code}
              onChange={handleCodeChange}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '16px' }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProblemSolver;
