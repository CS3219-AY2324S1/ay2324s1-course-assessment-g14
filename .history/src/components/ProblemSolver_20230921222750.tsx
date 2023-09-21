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
    backgroundColor: isDarkMode ? 'black' : 'white', // Change container background color
  };

  return (
    <Container sx={containerStyles}>
      <Grid container spacing={2} sx={{ flex: 1 }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: 2,
          }}
        >
          {/* Left side content */}
          {/* ... (same as before) */}
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Paper elevation={3} sx={{ flex: 1, padding: 2 }}>
            {/* Right side content */}
            {/* ... (same as before) */}
          </Paper>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
          onClick={handleDarkModeToggle}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Grid>
    </Container>
  );
}

export default ProblemSolver;
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
    backgroundColor: isDarkMode ? 'black' : 'white', // Change container background color
  };

  return (
    <Container sx={containerStyles}>
      <Grid container spacing={2} sx={{ flex: 1 }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: 2,
          }}
        >
          {/* Left side content */}
          {/* ... (same as before) */}
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Paper elevation={3} sx={{ flex: 1, padding: 2 }}>
            {/* Right side content */}
            {/* ... (same as before) */}
          </Paper>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
          onClick={handleDarkModeToggle}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Grid>
    </Container>
  );
}

export default ProblemSolver;
