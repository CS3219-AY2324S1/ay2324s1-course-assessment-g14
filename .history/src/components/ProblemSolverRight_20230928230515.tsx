import React, { useState } from 'react';
import { Paper, Typography, TextField, MenuItem, Button } from '@mui/material';
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Javascript } from '@mui/icons-material';
require('codemirror/mode/javascript/javascript');


const languages: string[] = ['C++', 'Java', 'JavaScript', 'Python'];

function ProblemSolverRight() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');
  const [code, setCode] = useState<string>('class Solution:');

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
    <Paper elevation={3} style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column' }}>
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
      <CodeMirror
      value={code}
      height="900px"
      theme={vscodeDark}
      mode: Javascript
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
