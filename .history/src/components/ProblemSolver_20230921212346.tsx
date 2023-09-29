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
  padding: '0', // Remove padding
  margin: '0', // Remove margin
};

function ProblemSolver() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');
  const [code, setCode] = useState<string>('');

  // ... (rest of the component remains the same)

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
