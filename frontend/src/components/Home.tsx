import React from "react";
import { Box } from "@mui/material";
import ButtonModal from "./MatchingService/MatchButton";
import QuestionsTable from "./Questions/QuestionsTable";

export default function Home() {
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
