import React, { useEffect } from "react";
import { Box } from "@mui/material";
import ButtonModal from "./MatchingService/MatchButton";
import QuestionsTable from "./Questions/QuestionsTable";

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
    <React.Fragment>
      <Box width="80%">
        <div>
          <h1>Welcome to the Technical Interview Preparation Portal</h1>
          <div>
            <h2>Match with someone</h2>
              Match with a partner to collaborate and solve a problem together
            <br /> <br />
            <ButtonModal />
            <h2>Practice on your own</h2>
              Click on any question below to start your personal practice session
          </div>
        </div>
      </Box>
      <QuestionsTable />
    </React.Fragment>
  );
}
