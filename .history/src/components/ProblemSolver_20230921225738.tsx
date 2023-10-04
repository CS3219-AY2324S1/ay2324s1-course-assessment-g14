import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
} from '@mui/material';
import { ResizableBox } from 'react-resizable';

const languages: string[] = ['C++', 'Java', 'JavaScript', 'Python'];

function ProblemSolver() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');
  const [code, setCode] = useState<string>('');

  const question = {
    title: 'Sample Coding Problem with a Very Long Title to Test Text Sizing',
    description: 'Write a function that adds two numbers. This is a longer description to test spacing.',
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
    console.log(`Selected Language: ${selectedLanguage}`);
    console.log(`Code: ${code}`);
  };

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
      <Grid container spacing={2} sx={{ flex: 1 }}>
        <ResizableBox
          width={window.innerWidth / 2} // Initial width
          // height="auto" // Auto height
          axis="x" // Allow resizing only in the x-axis (horizontal)
          minConstraints={[window.innerWidth / 4, 0]} // Minimum width constraint
          maxConstraints={[window.innerWidth * 0.75, 0]} // Maximum width constraint
          handle={<div className="custom-handle" />} // Custom resizable handle
          className="resizable-box"
        >
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 2 }}>
            <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 2 }}>
              <Typography variant="h4" gutterBottom sx={{ fontSize: '24px' }}>
                {question.title}
              </Typography>
              <Divider sx={{ marginBottom: 2, marginTop: 5 }} />
              <Typography variant="body1" sx={{ marginBottom: 2, fontSize: '18px' }}>
                {question.description}
              </Typography>
              <Divider sx={{ marginBottom: 10 }} />
              <Typography variant="h6" gutterBottom sx={{ fontSize: '18px' }}>
                Examples:
              </Typography>
              {question.examples.map((example, index) => (
                <div key={index}>
                  <Typography variant="body2" sx={{ fontSize: '18px' }}>
                    Input: {example.input}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '18px' }}>
                    Output: {example.output}
                  </Typography>
                  <br />
                </div>
              ))}
            </Paper>
          </Grid>
        </ResizableBox>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Paper elevation={3} sx={{ flex: 1, padding: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Select a Language:
            </Typography>
            <TextField
              select
              fullWidth
              value={selectedLanguage}
              onChange={handleLanguageChange}
              sx={{ width: '50%' }}
            >
              {languages.map((language, index) => (
                <MenuItem key={index} value={language}>
                  {language}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              multiline
              fullWidth
              variant="outlined"
              value={code}
              onChange={handleCodeChange}
              sx={{ flex: 1, marginTop: '16px' }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{ marginTop: '16px' }}
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
