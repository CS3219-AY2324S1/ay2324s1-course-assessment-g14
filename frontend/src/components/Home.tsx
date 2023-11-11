import { useEffect } from "react";
import { Box } from "@mui/material";

export default function Home() {
  // Sample data for practice questions (you can replace this with actual data)
  const practiceQuestions = [
    { difficulty: "Easy", count: 10 },
    { difficulty: "Medium", count: 20 },
    { difficulty: "Hard", count: 15 },
  ];
  // State to hold the practice questions data
  // const [questionsData, setQuestionsData] = useState(practiceQuestions);

  // You can fetch the actual data from your API using useEffect

  useEffect(() => {
    // Fetch practice questions data from your API here and update the state
    // Example API call:
    // fetch('/api/practice-questions')
    //   .then((response) => response.json())
    //   .then((data) => setQuestionsData(data));
  }, []);

  return (
    <Box>
      <div>
        <h1>Welcome to the Technical Interview Preparation Portal</h1>
        <div>
          <h2>Practice Questions</h2>
          <ul>
            {practiceQuestions.map((question) => (
              <li key={question.difficulty}>
                {question.difficulty}: {question.count} questions
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Box>
  );
}
