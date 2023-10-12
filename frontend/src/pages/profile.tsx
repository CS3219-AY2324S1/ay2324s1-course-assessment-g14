
import { useEffect, useState, useCallback } from "react";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";
import Navbar from "../components/Navbar";
import ProfileField from "../components/ProfileField";
import { useAuth } from "../auth/auth.context";
import { Values } from "../components/DropDownOrTextField";
import { updateUser } from "../api/user";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState<Values>({
    email: user?.email ? user?.email : "",
    name: user?.name ? user?.name : "",
    year: user?.year ? user?.year : "",
    major: user?.major ? user.major : "",
  });

  const profileFields = [
    { title: "Email", data: "email" },
    { title: "Display Name", data: "name" },
    { title: "Year of Study", data: "year" },
    { title: "Major", data: "major" },
  ];

  const toggleEdit = async () => {
    if (edit) {
      try {
        const response = await updateUser(value);
        setUser(value)
      } catch (e) {
        console.log(e)
      }
    }
    setEdit(!edit);
  };

  return (
    <Box height="100vh">
      <CssBaseline />
      <Navbar />
      <Container sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Avatar sx={{ height: 192, width: 192, mb: 2 }}>R</Avatar>
            {user && <Chip label={user.role} color="primary" />}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box display="flex" justifyContent="flex-end" width="100%">
              <Button
                variant="contained"
                onClick={toggleEdit}
                color={edit ? "success" : "primary"}
              >
                {edit ? "Save Details" : "Edit Details"}
              </Button>
            </Box>
            {profileFields.map((field) => (
              <ProfileField
                key={field.title}
                title={field.title}
                data={field.data}
                edit={edit}
                value={value}
                setValue={setValue}
              />
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
