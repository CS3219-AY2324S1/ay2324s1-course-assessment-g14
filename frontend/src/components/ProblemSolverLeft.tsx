// ProblemSolverLeft.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Paper,
  Typography,
  Divider,
  CardMedia,
} from '@mui/material';
import { useData } from '../data/data.context';
import {parseHtmlDescription} from "../utils/utils";
// import { ClosedCaptionDisabledSharp } from '@mui/icons-material';

const ProblemSolverLeft = () => {
  const { questionId } = useParams();
  const { questions } = useData();


  // Find the question that matches the questionId
  const question = questions.find((q) => q.id === questionId);
  console.log(questions)
  // console.log(question)
  useEffect(() => {
    // Fetch initial code or other data as needed
    // You can set the initial code or other data here
    // For example, setCode(question?.initialCode || '');
  }, [question]);



  if (!question) {
    // If the question is not found, display a message
    return (
      <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Question not found
          {questionId}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 2}}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: '24px' }}>
        {question.title}
      </Typography>
      <Divider sx={{ marginBottom: 2, marginTop: 5 }} />
      <Typography component={'span'} variant="body1" sx={{ marginBottom: 2, fontSize: '18px', overflowX: 'auto' }}>
        {parseHtmlDescription(question.description)}
      </Typography>
      <Divider sx={{ marginBottom: 10 }} />
      <Typography variant="h6" gutterBottom sx={{ fontSize: '18px' }}>
        Examples:
      </Typography>
      {question.examples.map((example, index) => (
        <div key={index}>
          <Typography variant="body2" sx={{ fontSize: '18px' }}>
            {example.text}
          </Typography>
          {example.image && (
            <CardMedia
              component="img"
              alt={`Example ${index + 1}`}
              sx={{ maxHeight: '100%', width: 'auto' }}
              height="140"
              image={example.image}
            />
          )}
          <br />
        </div>
      ))}
    </Paper>
  );
};

export default ProblemSolverLeft;
