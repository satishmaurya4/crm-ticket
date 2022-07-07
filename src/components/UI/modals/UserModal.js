import {
  TextField,
  Select,
  Typography,
  MenuItem,
  Modal,
  Box,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 520,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 2,
  m: 2,
  overflow: "auto",
};

const UserModal = ({
  userModal,
  onCloseUserModal,
  updateUser,
  userDetail,
  changeUserDetail,
}) => {
  // console.log("##", selectedCurrUser);
  return (
    <Modal open={userModal} onClose={onCloseUserModal}>
      <Box sx={style}>
        <Typography>Edit Details</Typography>
        <form className="form" onSubmit={updateUser}>
          <Typography className="modal-id admin-modal-id">
            Ticket ID:{userDetail.userId}
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={userDetail.name}
            onChange={changeUserDetail}
            color="secondary"
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={userDetail.email}
            onChange={changeUserDetail}
            color="secondary"
          />

          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              name="status"
              value={userDetail.userStatus}
              label="Status"
              onChange={changeUserDetail}
              color="secondary"
              style={{ width: "100%" }}
            >
              <MenuItem value="OPEN">OPEN</MenuItem>
              <MenuItem value="CLOSED">CLOSED</MenuItem>
              <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
              <MenuItem value="BLOCKED">BLOCKED</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-helper-label">
              User Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              name="type"
              value={userDetail.userTypes}
              label="Status"
              onChange={changeUserDetail}
              color="secondary"
              style={{ width: "100%" }}
            >
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="ENGINEER">ENGINEER</MenuItem>
              <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={onCloseUserModal}
            >
              Cancel
            </Button>
            <Button variant="contained" color="secondary" type="submit">
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UserModal;
