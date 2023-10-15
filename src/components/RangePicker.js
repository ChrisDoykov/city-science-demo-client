import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TextField } from "@mui/material";

export default function RangePicker({
  fromYear,
  setFromYear,
  toYear,
  setToYear,
}) {
  return (
    <DemoContainer
      components={["MultiInputDateRangeField", "SingleInputDateRangeField"]}
      sx={{
        maxWidth: "30rem",
        alignSelf: "center",
      }}
    >
      <TextField
        id="fromYear"
        label="From year"
        variant="outlined"
        type="number"
        value={fromYear}
        onChange={(e) => {
          setFromYear(e.target.value);
        }}
        InputProps={{
          inputProps: { min: 2014, max: new Date().getFullYear() },
        }}
      />
      <TextField
        id="toYear"
        label="To year"
        variant="outlined"
        type="number"
        value={toYear}
        onChange={(e) => {
          setToYear(e.target.value);
        }}
        InputProps={{
          inputProps: { min: 2014, max: new Date().getFullYear() },
        }}
      />
    </DemoContainer>
  );
}
