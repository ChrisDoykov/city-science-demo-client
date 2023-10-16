import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";
import { Container } from "@mui/material";

// Components
import Loader from "../components/Loader";
import Header from "../components/Header";

// Pages
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";

// Queries
import USER_IS_LOGGED_IN_QUERY from "../graphql/queries/user/userIsLoggedIn.js";

function MainRouter() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { loading, error } = useQuery(USER_IS_LOGGED_IN_QUERY, {
    fetchPolicy: "network-only",
    onCompleted: ({ userIsLoggedIn }) => {
      setLoggedIn(userIsLoggedIn);
    },
    onError() {
      setLoggedIn(false);
    },
  });

  const [recheckUserStatus, { loading: recheckLoading }] = useLazyQuery(
    USER_IS_LOGGED_IN_QUERY,
    {
      fetchPolicy: "network-only",
      onCompleted: ({ userIsLoggedIn }) => {
        setLoggedIn(userIsLoggedIn);
      },
      onError() {
        setLoggedIn(false);
      },
    }
  );

  if (error) {
    console.error("Failed checking if user is logged in: ", error);
    return (
      <div>
        <p>Something went wrong, please check the logs for details.</p>
      </div>
    );
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: "100svw",
        height: "100svh",
      }}
    >
      {loading || recheckLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Header loggedIn={loggedIn} recheckUserStatus={recheckUserStatus} />
          <Routes>
            <Route
              path="/login"
              element={
                loggedIn ? (
                  <Navigate replace to="/" />
                ) : (
                  <LoginPage recheckUserStatus={recheckUserStatus} />
                )
              }
            />
            <Route
              path="/register"
              element={
                loggedIn ? (
                  <Navigate replace to="/" />
                ) : (
                  <RegistrationPage recheckUserStatus={recheckUserStatus} />
                )
              }
            />
            {loggedIn ? (
              <React.Fragment>
                {/* Routes for authenticated users */}
                <Route
                  path="*"
                  element={<Homepage recheckUserStatus={recheckUserStatus} />}
                />
              </React.Fragment>
            ) : (
              <Route path="*" element={<Navigate replace to="/login" />} />
            )}
          </Routes>
        </React.Fragment>
      )}
    </Container>
  );
}

export default MainRouter;
