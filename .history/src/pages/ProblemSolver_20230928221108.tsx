import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import ProblemSolverLeft from '../components/ProblemSolverLeft';
import ProblemSolverRight from '../components/ProblemSolverRight';
import {useData} from '../data/data.context'
import { useParams } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';




function ProblemSolver() {

  const { questions } = useData();
  const { questionId } = useParams();

  // Find the question with the specified ID
  const question = questions.find((q) => q.id === questionId);
  console.log(question)
  // Check if the question doesn't exist
  if (!question) {
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          minHeight: '100vh',
          minWidth: '100vw',
          paddingY: 4,
        }}
      >
         <SentimentVeryDissatisfiedIcon sx={{ fontSize: 64, color: 'blue' }} />
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            borderRadius: 10, // Rounded border
            backgroundColor: '#42a5f5', // Dark blue background
            color: 'white', // White text
          }}
        >
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
