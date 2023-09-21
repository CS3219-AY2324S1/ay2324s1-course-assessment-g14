import { Box, CssBaseline, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import "./App.css";
import Titlebar from "../components/Questions/Titlebar";
import CenteredContainer from "../components/CenteredContainer";
import ProblemSolver from "../components/ProblemSolver";

export default function App() {
  return (
    <Box>
      <CssBaseline />
      <Navbar />
      <Container
        maxWidth="xl"
        style={{ margin: '0', padding: '0', height: '100vh' }}
      >
        <ProblemSolver />
      </Container>

      {/* <CenteredContainer>
        <Home />
        <Titlebar />
      </CenteredContainer> */}
    </Box>
  );
}
