import { useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import CenteredContainer from "../components/CenteredContainer";
import Navbar from "../components/Navbar";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../auth/auth.context";

export default function SignUp() {
  const { success, error, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickSignUp = () => signUp(email, password);

  return (
    <Box height="100vh">
      <CssBaseline />
      <Navbar />
      <CenteredContainer>
        <Typography variant="h4" align="center" paddingBottom={5}>
          Sign Up
        </Typography>
        <TextField
          sx={{ width: "25ch" }}
          label="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordField password={password} setPassword={setPassword} />
        <Button variant="contained" onClick={handleClickSignUp}>
          Sign Up
        </Button>
        {error && <Typography>{error}</Typography>}
        {success && (
          <Typography>
            Sign up successful! You may now <Link href="/login">login.</Link>
          </Typography>
        )}
      </CenteredContainer>
    </Box>
  );
}
