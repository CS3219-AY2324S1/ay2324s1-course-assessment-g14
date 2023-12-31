import { Box, CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import "./App.css";
import CenteredContainer from "../components/CenteredContainer";

export default function App() {
  return (
    <Box>
      <CssBaseline />
      <Navbar />    
      <CenteredContainer>
        <Home />
      </CenteredContainer>
    </Box>
  );
}
