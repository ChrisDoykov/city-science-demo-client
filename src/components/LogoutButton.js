import React from "react";
import { useMutation } from "@apollo/client";
import LOGOUT_MUTATION from "../graphql/mutations/user/logout";
import { LOCAL_STORAGE_USER } from "../consts";
import Button from "@mui/material/Button";

function LogoutButton({ recheckUserStatus }) {
  const [logout, { loading: logoutLoading }] = useMutation(LOGOUT_MUTATION, {
    onCompleted: async () => {
      localStorage.removeItem(LOCAL_STORAGE_USER);
      recheckUserStatus();
    },
    onError: async (error) => {
      console.error(error);
    },
  });

  return (
    <Button
      color="error"
      onClick={() => logout()}
      sx={{ color: "white", fontWeight: "bold" }}
    >
      {logoutLoading ? "Logging out..." : "Logout"}
    </Button>
  );
}

export default LogoutButton;
