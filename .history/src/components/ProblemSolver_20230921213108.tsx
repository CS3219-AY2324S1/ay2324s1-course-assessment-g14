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

const fullWidthStyle: React.CSSProperties = {
  width: '100%', // Set width to 100% to fill the entire viewport width
};

function ProblemSolver() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');
  const [code, setCode] = useState<string>('');

  // ... (rest of the component remains the same)

  return (
    <Container style={problemSolverStyle}>
      <Grid container spacing={2} style={fullWidthStyle}>
        <Grid item xs={12} md={6} style={{ ...fullWidthStyle, flex: '50%' }}>
          <Paper elevation={3} style={{ padding: '16px', height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              {question.title}
            </Typography>
            {/* ... (rest of left side content) */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} style={{ ...fullWidthStyle, flex: '50%' }}>
          <Paper elevation={3} style={{ padding: '16px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Select a Language:
            </Typography>
            {/* ... (rest of right side content) */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProblemSolver;
