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
        <Grid item xs={12} md={6}>
          {/* ... (left side content) */}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* ... (right side content) */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProblemSolver;
