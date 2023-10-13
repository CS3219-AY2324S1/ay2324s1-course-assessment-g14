import { Box, CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import CenteredContainer from "../components/CenteredContainer";
import QuestionsTable from "../components/Questions/QuestionsTable";

export default function QuestionsView() {
  return (
    <Box>
      <CssBaseline />
      <Navbar />    
      <CenteredContainer>
        <QuestionsTable />
      </CenteredContainer>
    </Box>
  );
}
