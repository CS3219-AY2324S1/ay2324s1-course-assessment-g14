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
        backgroundColor: isDarkMode ? 'black' : 'white', // Change container background color
      }}
    >
       <Grid container spacing={2} sx={{ flex: 1 }}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 2 }}>
          {/* Left-side content */}
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Paper elevation={3} sx={{ flex: 1, padding: 2, display: 'flex', flexDirection: 'column' }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h6" gutterBottom>
                Select a Language:
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDarkModeToggle}
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </Grid>
            <TextField
              select
              fullWidth
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {languages.map((language, index) => (
                <MenuItem key={index} value={language}>
                  {language}
                </MenuItem>
              ))}
            </TextField>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ marginTop: '16px' }}
            >
              Code Editor:
            </Typography>
            <TextField
              multiline
              fullWidth
              variant="outlined"
              rows={10}
              value={code}
              onChange={handleCodeChange}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '16px' }}
              onClick={handleSubmit}
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
