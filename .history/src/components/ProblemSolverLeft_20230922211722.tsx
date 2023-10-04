import React from 'react';
import { Paper, Typography, Divider } from '@mui/material';

function ProblemSolverLeft() {
  const question = {
    title: 'Sample Coding Problem with a Very Long Title to Test Text Sizing',
    description: 'Write a function that adds two numbers. This is a longer description to test spacing.',
    examples: [
      { input: '1, 2', output: '3' },
      { input: '5, 7', output: '12' },
    ],
  };

  return (
    <Paper elevation={3} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 16 }}>
      <Typography variant="h4" gutterBottom style={{ fontSize: '24px' }}>
        {question.title}
      </Typography>
      <Divider style={{ marginBottom: 2, marginTop: 5 }} />
      <Typography variant="body1" style={{ marginBottom: 2, fontSize: '18px' }}>
        {question.description}
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
      <Typography variant="h6" gutterBottom style={{ fontSize: '18px' }}>
        Examples:
      </Typography>
      {question.examples.map((example, index) => (
        <div key={index}>
          <Typography variant="body2" style={{ fontSize: '18px' }}>
            Input: {example.input}
          </Typography>
          <Typography variant="body2" style={{ fontSize: '18px' }}>
            Output: {example.output}
          </Typography>
          <br />
        </div>
      ))}
    </Paper>
  );
}

export default ProblemSolverLeft;
