import React from "react";
import loader from "../assets/loader.svg";

export default function Loader() {
  return (
    <div className={`loader`}>
      <img
        style={{
          width: "100%",
          maxWidth: "3rem",
          margin: "0 auto",
        }}
        src={loader}
        alt="Animated Spinning Loader"
      />
    </div>
  );
}
