import * as React from "react";
import { useMutation } from "@apollo/client";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { prop } from "ramda";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Mutations
import REGISTER_MUTATION from "../graphql/mutations/user/register.js";

// Consts
import { LOCAL_STORAGE_USER } from "../consts.js";

// Components
import Loader from "../components/Loader.js";

export default function RegistrationPage({ recheckUserStatus }) {
  const navigate = useNavigate();

  const [register, { loading, error }] = useMutation(REGISTER_MUTATION, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (prop("register", data)) {
        const { name, email, createdAt } = data.register;

        localStorage.setItem(
          LOCAL_STORAGE_USER,
          JSON.stringify({ name, email, createdAt })
        );
        recheckUserStatus();
        navigate("/");
      }
    },
    onError(error) {
      toast(`${error.message}`, { type: "error", toastId: "failed-reg" });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName")?.trim();
    const lastName = data.get("lastName")?.trim();

    register({
      variables: {
        name: `${firstName} ${lastName}`,
        email: data.get("email"),
        password: data.get("password"),
      },
    });
  };

  if (error) console.error(error);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
}
