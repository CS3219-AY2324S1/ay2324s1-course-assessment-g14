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

const languages: string[] = ['C++', 'Java', 'JavaScript', 'Python'];

function ProblemSolver() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');
  const [code, setCode] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

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

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    minWidth: '100vw',
    paddingY: 4,
  };

  return (
    <Container
      sx={{
        ...containerStyles,
        backgroundColor: isDarkMode ? 'black' : 'white', // Change container background color
      }}
    >
      <Grid container spacing={2} sx={{ flex: 1 }}>
        {/* Rest of the code remains the same */}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '16px' }}
        onClick={handleDarkModeToggle}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>
    </Container>
  );
}

export default ProblemSolver;
