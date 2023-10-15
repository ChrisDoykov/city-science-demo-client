import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useLocation, NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function Header({ loggedIn, recheckUserStatus }) {
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Button
            component={NavLink}
            variant="text"
            sx={{ color: "white", fontWeight: "bold" }}
            to="/"
          >
            Home
          </Button>
          {loggedIn ? (
            <LogoutButton recheckUserStatus={recheckUserStatus} />
          ) : location.pathname.includes("register") ? (
            <Button
              component={NavLink}
              variant="text"
              sx={{ color: "white", fontWeight: "bold" }}
              to="/login"
            >
              Login
            </Button>
          ) : (
            <Button
              component={NavLink}
              variant="text"
              sx={{ color: "white", fontWeight: "bold" }}
              to="/register"
            >
              Sign up
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
