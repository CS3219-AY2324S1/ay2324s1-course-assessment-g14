// ProblemSolverLeft.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Paper,
  Typography,
  Divider,
} from '@mui/material';
import { useData } from '../data/data.context';

const ProblemSolverLeft = () => {
  const { questionId } = useParams();
  const { questions } = useData();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');
  const [code, setCode] = useState<string>('');

  // Find the question that matches the questionId
  const question = questions.find((q) => q.id === questionId);

  useEffect(() => {
    // Fetch initial code or other data as needed
    // You can set the initial code or other data here
    // For example, setCode(question?.initialCode || '');
  }, [question]);

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
    // Handle code submission here
  };

  if (!question) {
    // If the question is not found, display a message
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Question Not Found
        </Typography>
      </div>
    );
  }

  return (
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
  );
};

export default ProblemSolverLeft;
