import React from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Button, Container, Paper, Grid } from "@mui/material";

function Landing() {
  React.useEffect(() => {
    const getHello = async () =>
      await axios
        .get(`${process.env.REACT_APP_DEV_ENDPOINT}`)
        .then((r) => console.log(r.data));
    getHello();

    const login = async () =>
      await axios
        .post(`${process.env.REACT_APP_DEV_ENDPOINT}login`, {
          email: process.env.REACT_APP_TEST_EMAIL,
          password: process.env.REACT_APP_TEST_PASSWORD,
        })
        .then((r) => console.log(r.data));
    login();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to PeerPrep!
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Prepare for technical interviews with PeerPrep
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              Why Choose Us?
            </Typography>
            <Typography variant="body1">
              PeerPrep is your go-to platform for technical interview
              preparation. Practice whiteboard-style interview questions with
              peers and improve your skills.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              Get Started
            </Typography>
            <Typography variant="body1">
              Join our community of students and professionals to enhance your
              technical interview skills.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/signup"
              sx={{ marginRight: 2 }}
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component={RouterLink}
              to="/login"
            >
              Log In
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
        &copy; 2023 PeerPrep
      </Typography>
    </Container>
  );
}

export default Landing;
