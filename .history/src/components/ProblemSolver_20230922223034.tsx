import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import ProblemSolverLeft from './ProblemSolverLeft';
import ProblemSolverRight from './ProblemSolverRight';
import {useData} from '../data/data.context'
import { useParams } from 'react-router-dom';

const { questions, getQuestions } = useData();

function ProblemSolver() {
  const { questions } = useData();
  const { questionId } = useParams();

  // Find the question with the specified ID
  const question = questions.find((q) => q.id === questionId);

  // Check if the question doesn't exist
  if (!question) {
    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          minWidth: '100vw',
          paddingY: 4,
        }}
      >
        <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            Question not found
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        minWidth: '100vw',
        paddingY: 4,
      }}
    >
      <Grid container spacing={1} sx={{ flex: 1 }}>
        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 1}}>
          <ProblemSolverLeft />
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <ProblemSolverRight />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProblemSolver;
