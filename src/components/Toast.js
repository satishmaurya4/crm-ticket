import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast({ info: { status, message }, openToast, setOpenToast }) {
  const { open,vertical, horizontal } = openToast;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast({
      open: false,
      vertical,
      horizontal
    });
  };

  return (
    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
      <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

