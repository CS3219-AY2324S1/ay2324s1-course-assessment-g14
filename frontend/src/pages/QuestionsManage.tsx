import {Box, CssBaseline, Typography} from "@mui/material";
import Navbar from "../components/Navbar";
import CenteredContainer from "../components/CenteredContainer";
import AddQuestionTab from "../components/Questions/AddQuestionTab";
import EditQuestionsTab from "../components/Questions/EditQuestionsTab";
import React from "react";

export default function QuestionsManage() {
  return (
    <Box>
      <CssBaseline />
      <Navbar />
      <CenteredContainer>
          <Typography variant="h4" align="center" gutterBottom paddingTop={3}>
            Manage Question Repository
          </Typography>
          <AddQuestionTab />
          <EditQuestionsTab />
      </CenteredContainer>
    </Box>
  );
}
