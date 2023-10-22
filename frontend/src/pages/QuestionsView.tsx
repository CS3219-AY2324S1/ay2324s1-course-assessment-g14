import {Box, CssBaseline, Typography} from "@mui/material";
import Navbar from "../components/Navbar";
import CenteredContainer from "../components/CenteredContainer";
import QuestionsTable from "../components/Questions/QuestionsTable";
import React from "react";

export default function QuestionsView() {
  return (
    <Box>
      <CssBaseline />
      <Navbar />    
      <CenteredContainer>
        <Typography variant="h4" align="center" gutterBottom paddingTop={3}>
          Questions
        </Typography>
        <QuestionsTable />
      </CenteredContainer>
    </Box>
  );
}
