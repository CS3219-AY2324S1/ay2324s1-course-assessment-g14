import { useState } from "react";
import { Box, Button, CssBaseline, TextField, Typography } from "@mui/material";
import CenteredContainer from "../components/CenteredContainer";
import Navbar from "../components/Navbar";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../auth/auth.context";

export default function Login() {
  const { error, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickSignUp = () => login(email, password);

  return (
    <Box height="100vh">
      <CssBaseline />
      <Navbar />
      <CenteredContainer>
        <TextField
          label="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordField password={password} setPassword={setPassword} />
        <Button variant="contained" onClick={handleClickSignUp}>
          Login
        </Button>
        {error && <Typography>{error}</Typography>}
      </CenteredContainer>
    </Box>
  );
}
