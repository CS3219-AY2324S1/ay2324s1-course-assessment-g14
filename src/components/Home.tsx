import React, { useState, useEffect } from 'react';

function Home() {
  // Sample data for practice questions (you can replace this with actual data)
  const practiceQuestions = [
    { difficulty: 'Easy', count: 10 },
    { difficulty: 'Medium', count: 20 },
    { difficulty: 'Hard', count: 15 },
  ];

  // State to hold the practice questions data
  const [questionsData, setQuestionsData] = useState(practiceQuestions);

  // You can fetch the actual data from your API using useEffect

  useEffect(() => {
    // Fetch practice questions data from your API here and update the state
    // Example API call:
    // fetch('/api/practice-questions')
    //   .then((response) => response.json())
    //   .then((data) => setQuestionsData(data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
      <div>
        <h1>Welcome to the Technical Interview Preparation Portal</h1>
        <div>
          <h2>Practice Questions</h2>
          <ul>
            {questionsData.map((question, index) => (
              <li key={index}>
                {question.difficulty}: {question.count} questions
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
