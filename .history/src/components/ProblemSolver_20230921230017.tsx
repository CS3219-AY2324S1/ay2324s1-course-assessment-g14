import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
} from '@mui/material';

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
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1 }}>
          <Paper elevation={3} style={{ padding: '16px', height: '100%' }}>
            <Typography variant="h4" gutterBottom>
              {question.title}
            </Typography>
            <Divider style={{ marginBottom: '8px' }} />
            <Typography variant="body1" style={{ marginBottom: '8px' }}>
              {question.description}
            </Typography>
            <Divider style={{ marginBottom: '8px' }} />
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
        </div>
        <div style={{ flex: 1 }}>
          <Paper elevation={3} style={{ padding: '16px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Select a Language:
            </Typography>
            <TextField
              select
              fullWidth
              value={selectedLanguage}
              onChange={handleLanguageChange}
              style={{ width: '50%' }} // Adjust the width of the select menu
            >
              {languages.map((language, index) => (
                <MenuItem key={index} value={language}>
                  {language}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="h6" gutterBottom style={{ marginTop: '16px' }}>
              Code Editor:
            </Typography>
            <TextField
              multiline
              fullWidth
              variant="outlined"
              rows={30}
              value={code}
              onChange={handleCodeChange}
              style={{ flex: 1, marginTop: '16px' }} // Let the code editor take the remaining space
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              style={{ marginTop: '16px' }} // Add top margin
            >
              Submit
            </Button>
          </Paper>
        </div>
      </div>
    </Container>
  );
}

export default ProblemSolver;
