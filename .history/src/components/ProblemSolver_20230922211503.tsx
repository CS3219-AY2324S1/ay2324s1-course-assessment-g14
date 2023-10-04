import React from 'react';
import { Container, Grid } from '@mui/material';
import ProblemSolverLeft from './ProblemSolverLeft';
import ProblemSolverRight from './ProblemSolverRight';

function ProblemSolver() {
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
        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 2, margin: 2}}>
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
