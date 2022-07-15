import React from "react";
import { CircularProgress } from "@mui/material";

const RecordLoader = () => {
  const styles = {
    backgroundColor: "rgba(0,0,0,.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 999,
  };
  return (
    <div style={styles}>
      <div>
        <CircularProgress color="inherit" />
      </div>
    </div>
  );
};

export default RecordLoader;
