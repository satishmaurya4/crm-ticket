import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { fetchTickets, ticketCreation, ticketUpdation } from "../api/tickets";
import TicketTable from "../components/TicketTable";
import TicketCountCard from "../components/TicketCountCard";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { logout } from "../utils/logout";
import RecordLoader from "../components/UI/RecordLoader";

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

function Customer() {
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const [updateTicketModal, setUpdateTicketModal] = useState(false);
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
  const [message, setMessage] = useState("");
  const [allTicket, setAllTicket] = useState([]);
  const [openTicket, setOpenTicket] = useState([]);
  const [closedTicket, setClosedTicket] = useState([]);
  const [pendingTicket, setPendingTicket] = useState([]);
  const [blockedTicket, setBlockedTicket] = useState([]);
  const [ticketsCount, setTicketsCount] = useState({});
  const [showRecordLoader, setShowRecordLoader] = useState(false);

  const ticketRecordRef = useRef();
  const topRef = useRef();

  const showCreateTicketModal = () => setCreateTicketModal(true);
  const closeCreateTicketModal = () => {
    setCreateTicketModal(false);
  };
  const showUpdateTicketModal = () => setUpdateTicketModal(true);
  const closeUpdateTicketModal = () => {
    setUpdateTicketModal(false);
  };

  const fetchTicket = () => {
    fetchTickets()
      .then(function (response) {
        const data = response.data;
        const getOpenTicket = response.data.filter((ticket) => {
          return ticket.status === "OPEN";
        });
        const getClosedTicket = response.data.filter((ticket) => {
          return ticket.status === "CLOSED";
        });
        const getPendingTicket = response.data.filter((ticket) => {
          return ticket.status === "IN_PROGRESS";
        });
        const getBlockedTicket = response.data.filter((ticket) => {
          return ticket.status === "BLOCKED";
        });
        setOpenTicket(getOpenTicket);
        setClosedTicket(getClosedTicket);
        setPendingTicket(getPendingTicket);
        setBlockedTicket(getBlockedTicket);
        setAllTicket(data);
        updateTicketCount(data);
      })
      .catch(function (error) {
        setMessage(error.message);
      });
  };

  const createTicket = (e) => {
    e.preventDefault();
    closeCreateTicketModal();
    setShowRecordLoader(true);
    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
    };
    ticketCreation(data)
      .then(function (response) {
        setMessage("Ticket updated successfully");
        setShowRecordLoader(false);

        fetchTicket();
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const editTicket = (ticketDetail) => {
    const ticket = {
      assignee: ticketDetail.assignee,
      description: ticketDetail.description,
      id: ticketDetail.id,
      reporter: ticketDetail.reporter,
      status: ticketDetail.status,
      title: ticketDetail.title,
    };
    setSelectedCurrTicket(ticket);
    showUpdateTicketModal();
  };

  const onTicketUpdate = (e) => {
    if (e.target.name === "title") selectedCurrTicket.title = e.target.value;
    else if (e.target.name === "description")
      selectedCurrTicket.description = e.target.value;
    else if (e.target.name === "status")
      selectedCurrTicket.status = e.target.value;

    updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket));
  };

  const updateSelectedCurrTicket = (updatedTicketValue) => {
    setSelectedCurrTicket(updatedTicketValue);
  };

  const updateTicket = (e) => {
    e.preventDefault();
    closeUpdateTicketModal();
    setShowRecordLoader(true);
    ticketUpdation(selectedCurrTicket.id, selectedCurrTicket)
      .then(function (response) {
        setMessage("Ticket Updated Successfully");
        setShowRecordLoader(false);

        fetchTicket();
      })
      .catch(function (error) {
        if (error.response.status === 400) setMessage(error.message);
        else if (error.response.status === 401) logout();
      });
  };

  const updateTicketCount = (tickets) => {
    const data = {
      all: 0,
      open: 0,
      closed: 0,
      pending: 0,
      blocked: 0,
    };
    tickets.forEach((ticket) => {
      data.all += 1;
      switch (ticket.status) {
        case "OPEN":
          return (data.open += 1);
        case "CLOSED":
          return (data.closed += 1);
        case "IN_PROGRESS":
          return (data.pending += 1);
        case "BLOCKED":
          return (data.blocked += 1);
        default:
          return;
      }
    });
    setTicketsCount(data);
  };

  const sidebarStyle = {
    bg: {
      backgroundColor: "var(--customer-content-color)",
    },
    logo: {
      backgroundColor: "rgb(0, 119, 179)",
    },
  };

  useEffect(() => {
    (async () => {
      fetchTicket();
    })();
  }, []);
  return (
    <>
      {showRecordLoader && <RecordLoader />}
      <div className="page-container" ref={topRef}>
        <Sidebar
          sidebarStyle={sidebarStyle}
          ticketRef={ticketRecordRef}
          topRef={topRef}
        />
        <h3
          className="text-center"
          style={{ color: "var(--customer-content-color)" }}
        >
          Welcome, {localStorage.getItem("name")}
        </h3>
        <p className=" text-center">Take a quick look at your status below</p>
        <div className="records" ref={ticketRecordRef}>
          <h4
            className="records-title"
            style={{ background: "var(--customer-content-bg-gradient)" }}
          >
            <span className="records-title-ring"></span>
            <span>ticket records</span>
            <span className="records-title-ring"></span>
          </h4>
          <div className="records-stats">
            <TicketTable
              editTicket={editTicket}
              ticketList={{
                all: allTicket,
                open: openTicket,
                closed: closedTicket,
                pending: pendingTicket,
                blocked: blockedTicket,
              }}
              customer
            />
            <div className="ticket-stats">
              <TicketCountCard
                status="open"
                title="open"
                count={ticketsCount.open}
                totalCount={ticketsCount.all}
              />
              <TicketCountCard
                status="closed"
                title="closed"
                count={ticketsCount.closed}
                totalCount={ticketsCount.all}
              />
              <TicketCountCard
                status="pending"
                title="pending"
                count={ticketsCount.pending}
                totalCount={ticketsCount.all}
              />
              <TicketCountCard
                status="blocked"
                title="blocked"
                count={ticketsCount.blocked}
                totalCount={ticketsCount.all}
              />
            </div>
          </div>
        </div>

        <Button
          variant="contained"
          startIcon={<i className="bi bi-plus-circle-dotted"></i>}
          color="info"
          className="create-ticket-btn"
          onClick={showCreateTicketModal}
        >
          Raise Ticket
        </Button>

        {createTicketModal ? (
          <Modal open={createTicketModal} onClose={closeCreateTicketModal}>
            <Box sx={style}>
              <Typography mb={2}>Create Ticket</Typography>
              <form onSubmit={createTicket} className="form">
                <TextField
                  type="text"
                  name="title"
                  label="Title"
                  variant="outlined"
                  color="info"
                  sx={{ width: "100%" }}
                />
                <TextareaAutosize
                  maxRows={4}
                  name="description"
                  aria-label="maximum height"
                  placeholder="Description"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    padding: "5px",
                    border: "2px solid lightgray",
                  }}
                  className="cx-textarea"
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={closeCreateTicketModal}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" color="info" type="submit">
                    Create
                  </Button>
                </Box>
              </form>
            </Box>
          </Modal>
        ) : (
          ""
        )}

        {updateTicketModal ? (
          <Modal open={updateTicketModal} onClose={closeUpdateTicketModal}>
            <Box sx={style}>
              <Typography mb={2}>Update Ticket Details</Typography>
              <form onSubmit={updateTicket} className="form">
                <TextField
                  type="text"
                  name="title"
                  value={selectedCurrTicket.title}
                  onChange={onTicketUpdate}
                  label="Title"
                  variant="outlined"
                  color="info"
                  sx={{ width: "100%" }}
                />

                <FormControl sx={{ width: "100%" }} className="cx-select">
                  <InputLabel id="demo-simple-select-helper-label">
                    Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    name="status"
                    value={selectedCurrTicket.status}
                    label="Status"
                    onChange={onTicketUpdate}
                    style={{ width: "100%" }}
                    color = "info"
                  >
                    <MenuItem value="OPEN">OPEN</MenuItem>
                    <MenuItem value="CLOSED">CLOSED</MenuItem>
                  </Select>
                </FormControl>

                <TextareaAutosize
                  maxRows={4}
                  name="description"
                  value={selectedCurrTicket.description}
                  onChange={onTicketUpdate}
                  aria-label="maximum height"
                  placeholder="Description"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    padding: "5px",
                    border: "2px solid lightgray",
                  }}
                  className="cx-textarea"
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={closeUpdateTicketModal}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" color="info" type="submit">
                    Update
                  </Button>
                </Box>
              </form>
            </Box>
          </Modal>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Customer;
