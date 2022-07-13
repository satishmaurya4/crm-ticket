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
  height: "max-content",
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
  admin
}) => {
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

          <FormControl sx={{ width: "100%" }} className={admin ? 'admin-select' : 'eng-select'}>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              name="status"
              value={userDetail.userStatus}
              label="Status"
              onChange={changeUserDetail}
              color="secondary"
              style={{ width: "100%" }}
            >
              <MenuItem value="OPEN" className={admin ? 'admin-menuItem': 'eng-menuItem'}>OPEN</MenuItem>
              <MenuItem value="CLOSED" className={admin ? 'admin-menuItem': 'eng-menuItem'}>CLOSED</MenuItem>
              <MenuItem value="IN_PROGRESS" className={admin ? 'admin-menuItem': 'eng-menuItem'}>IN_PROGRESS</MenuItem>
              <MenuItem value="BLOCKED" className={admin ? 'admin-menuItem': 'eng-menuItem'}>BLOCKED</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: "100%" }} className={admin ? 'admin-select' : 'eng-select'}>
            <InputLabel id="userType">
              User Type
            </InputLabel>
            <Select
              labelId="userType"
              name="type"
              value={userDetail.userTypes}
              label="User Type"
              onChange={changeUserDetail}
              color="secondary"
              style={{ width: "100%" }}
            >
              <MenuItem value="ADMIN" className={admin ? 'admin-menuItem': 'eng-menuItem'}>ADMIN</MenuItem>
              <MenuItem value="ENGINEER" className={admin ? 'admin-menuItem': 'eng-menuItem'}>ENGINEER</MenuItem>
              <MenuItem value="CUSTOMER" className={admin ? 'admin-menuItem': 'eng-menuItem'}>CUSTOMER</MenuItem>
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
