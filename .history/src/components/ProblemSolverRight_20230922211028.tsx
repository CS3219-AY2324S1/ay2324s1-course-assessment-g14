import React, { useState } from 'react';
import { Paper, Typography, TextField, MenuItem, Button } from '@mui/material';

const languages: string[] = ['C++', 'Java', 'JavaScript', 'Python'];

function ProblemSolverRight() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');
  const [code, setCode] = useState<string>('');

  const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedLanguage(event.target.value as string);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleSubmit = () => {
    console.log(`Selected Language: ${selectedLanguage}`);
    console.log(`Code: ${code}`);
  };

  return (
    <Paper elevation={3} style={{ flex: 1, padding: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Select a Language:
      </Typography>
      <TextField
        select
        fullWidth
        value={selectedLanguage}
        onChange={handleLanguageChange}
        style={{ width: '50%' }}
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
        style={{ flex: 1, marginTop: '16px' }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        style={{ marginTop: '16px' }}
      >
        Submit
      </Button>
    </Paper>
  );
}

export default ProblemSolverRight;