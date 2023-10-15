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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LOGIN_MUTATION from "../graphql/mutations/user/login.js";
import { LOCAL_STORAGE_USER } from "../consts.js";
import Loader from "../components/Loader.js";

export default function LoginPage({ recheckUserStatus }) {
  const navigate = useNavigate();

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (prop("login", data)) {
        const { name, email, createdAt } = data.login;

        localStorage.setItem(
          LOCAL_STORAGE_USER,
          JSON.stringify({ name, email, createdAt })
        );
        recheckUserStatus();
        navigate("/");
      }
    },
    onError(error) {
      toast(`${error.message}`, { type: "error", toastId: "failed-login" });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    login({
      variables: {
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
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
