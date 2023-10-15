import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Box, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { isEmpty, isNil, not, or, path, prop } from "ramda";
import RangePicker from "../components/RangePicker";

import GET_DATA_BETWEEN_YEARS_QUERY from "../graphql/queries/data/getTrafficDataBetweenYears.js";
import { LOCAL_STORAGE_USER } from "../consts";

function Homepage({ recheckUserStatus }) {
  const [fromYear, setFromYear] = useState(2014);
  const [toYear, setToYear] = useState(new Date().getFullYear());
  const [url, setUrl] = useState(null);

  let user = localStorage.getItem(LOCAL_STORAGE_USER);
  if (user) user = JSON.parse(user);

  const [getDataBetweenYears, { loading }] = useLazyQuery(
    GET_DATA_BETWEEN_YEARS_QUERY,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (prop("getTrafficDataBetweenYears", data)) {
          setUrl(path(["getTrafficDataBetweenYears", "url"], data));
        }
      },
      onError({ message }) {
        if (message.includes("auth")) recheckUserStatus();
        toast(`${message}`, { type: "error", toastId: "failed-data" });
      },
    }
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      p="2rem 3rem"
      rowGap="1.5rem"
    >
      <Typography variant="h4" textAlign="center">
        Retrieve Traffic Data
      </Typography>
      {prop("name", user) && (
        <Typography mb={0} maxWidth={"40rem"} paragraph>
          Hello {user.name.split(" ")[0]}, let's fetch some traffic data! Use
          the inputs below to choose the range you'd like data for.
        </Typography>
      )}
      <RangePicker
        fromYear={fromYear}
        toYear={toYear}
        setFromYear={setFromYear}
        setToYear={setToYear}
      />
      <Button
        disabled={loading}
        variant="contained"
        onClick={() =>
          getDataBetweenYears({
            variables: {
              toYear,
              fromYear,
            },
          })
        }
      >
        {loading ? "Fetching..." : "Fetch my data!"}
      </Button>
      {not(or(isNil(url), isEmpty(url))) && (
        <Box
          sx={{
            display: "flex",
            rowGap: "1rem",
            columnGap: "1rem",
          }}
        >
          <Button
            variant="contained"
            download={`traffic-data-${fromYear}-${toYear}.csv`}
            color="secondary"
            href={url}
          >
            Download CSV
          </Button>
          <Button variant="outlined" target="_blank" href={url}>
            View CSV
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Homepage;
