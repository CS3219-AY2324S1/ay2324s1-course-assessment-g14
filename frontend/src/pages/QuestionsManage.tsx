import { Box, CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import CenteredContainer from "../components/CenteredContainer";
import QuestionsTable from "../components/Questions/QuestionsTable";
import AddQuestionTab from "../components/Questions/AddQuestionTab";
import EditQuestionsTab from "../components/Questions/EditQuestionsTab";

export default function QuestionsManage() {
  return (
    <Box>
      <CssBaseline />
      <Navbar />    
      <CenteredContainer>
        <QuestionsTable />
        <AddQuestionTab />
        <EditQuestionsTab />
      </CenteredContainer>
    </Box>
  );
}
