import {
  TextField,
  Select,
  Typography,
  MenuItem,
  Modal,
  Box,
  Button,
  TextareaAutosize,
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

const TicketModal = ({
  ticketModal,
  onCloseTicketModal,
  selectedCurrTicket,
  onTicketUpdate,
  allUser,
  updateTicket,
  selectedCurrTicketStatus,
  setSelectedCurrTicketStatus,
  selectedCurrTicketAssignee,
  setSelectedCurrTicketAssignee,
  admin,
  engineer,
}) => {
  return (
    <Modal
      open={ticketModal}
      onClose={onCloseTicketModal}
      sx={{ overflow: "hidden" }}
    >
      <Box sx={style}>
        <Typography>Edit Details</Typography>

        <form className="form" onSubmit={updateTicket}>
          <Typography
            className={`modal-id ${
              admin ? "admin-modal-id" : "engineer-modal-id"
            }`}
          >
            Ticket ID:{selectedCurrTicket.id}
          </Typography>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            value={selectedCurrTicket.title}
            onChange={onTicketUpdate}
            color={admin ? "secondary" : "warning"}
          />
          {admin && (
            <TextField
              id="reporter"
              label="Reporter"
              variant="outlined"
              value={selectedCurrTicket.reporter}
              onChange={onTicketUpdate}
              color={admin ? "secondary" : "warning"}
            />
          )}
          <TextField
            id="ticketPriority"
            label="Priority"
            variant="outlined"
            value={selectedCurrTicket.ticketPriority}
            onChange={onTicketUpdate}
            color={admin ? "secondary" : "warning"}
          />
          {admin && (
            <FormControl
              sx={{ width: "100%" }}
              className={admin ? "admin-select" : "eng-select"}
            >
              <InputLabel id="demo-simple-select-helper-label">
                Assignee
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="assignee"
                value={selectedCurrTicketAssignee}
                label="Assignee"
                onChange={(event) =>
                  setSelectedCurrTicketAssignee(event.target.value)
                }
                color={admin ? "secondary" : "warning"}
              >
                {allUser.map((user, i) => {
                  if (user.userTypes === "ENGINEER") {
                    return (
                      <MenuItem
                        value={user.name}
                        key={i}
                        textColor="secondary"
                      >
                        {user.name}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
          )}
          {engineer && (
            <TextField
              id="assignee"
              label="Assignee"
              variant="outlined"
              value={selectedCurrTicket.assignee}
              onChange={onTicketUpdate}
              color={admin ? "secondary" : "warning"}
              InputProps={{
                readOnly: true,
              }}
            />
          )}

          <FormControl
            sx={{ width: "100%" }}
            className={admin ? "admin-select" : "eng-select"}
          >
            <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="status"
              value={selectedCurrTicketStatus}
              label="Status"
              onChange={(event) =>
                setSelectedCurrTicketStatus(event.target.value)
              }
              color={admin ? "secondary" : "warning"}
              style={{ width: "100%" }}
            >
              <MenuItem
                value="OPEN"
                className={admin ? "admin-menuItem" : "eng-menuItem"}
              >
                OPEN
              </MenuItem>
              <MenuItem
                value="CLOSED"
                className={admin ? "admin-menuItem" : "eng-menuItem"}
              >
                CLOSED
              </MenuItem>
              <MenuItem
                value="IN_PROGRESS"
                className={admin ? "admin-menuItem" : "eng-menuItem"}
              >
                IN_PROGRESS
              </MenuItem>
              <MenuItem
                value="BLOCKED"
                className={admin ? "admin-menuItem" : "eng-menuItem"}
              >
                BLOCKED
              </MenuItem>
            </Select>
          </FormControl>
          <TextareaAutosize
            maxRows={4}
            id="description"
            aria-label="maximum height"
            placeholder="Description..."
            defaultValue={selectedCurrTicket.description}
            onChange={onTicketUpdate}
            style={{
              width: "100%",
              borderRadius: "10px",
              padding: "5px",
              border: "2px solid lightgray",
            }}
            className={admin ? "admin-textarea" : "eng-textarea"}
          />
          <Box
            sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color={admin ? "secondary" : "warning"}
              onClick={onCloseTicketModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color={admin ? "secondary" : "warning"}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default TicketModal;
