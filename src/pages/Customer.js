import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
// import { Modal } from "react-bootstrap";
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
} from "@mui/material";

/*
UI : 
: Sidebar
: Cards : react circular progress bar 
: Material Table : to display all the tickets 
: Modal : raise a new ticket 



LOGIC : 
All state values : 
: modal : raise ticket, updateTicket
: ticketDetails : to store all the tickets raised by the user : fetch tickets 
: ticketCount : segregating the tickets according to their status
: currTicket : to update the details , edit the tickets


*/

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
  const [message, setMessage] = useState("");
  const [ticketDetails, setTicketDetails] = useState([]);
  const [allTicket, setAllTicket] = useState([]);
  const [openTicket, setOpenTicket] = useState([]);
  const [closedTicket, setClosedTicket] = useState([]);
  const [pendingTicket, setPendingTicket] = useState([]);
  const [blockedTicket, setBlockedTicket] = useState([]);
  const [ticketsCount, setTicketsCount] = useState({});

  const ticketRecordRef = useRef();

  const showTicketModal = () => setCreateTicketModal(true);
  const closeTicketModal = () => {
    setCreateTicketModal(false);
  };

  const fetchTicket = () => {
    fetchTickets()
      .then(function (response) {
        const data = response.data;
        // console.log(response.data);
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
        console.log(error.message);
        setMessage(error.message);
      });
  };

  const createTicket = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
    };
    ticketCreation(data)
      .then(function (response) {
        console.log(response.data);
        setMessage("Ticket updated successfully");
        closeTicketModal();
        fetchTickets();
      })
      .catch((error) => {
        console.log(error.message);
        setMessage(error.message);
      });
  };

  const editTicket = () => {};

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
      <div className="page-container">
        <Sidebar sidebarStyle={sidebarStyle} ticketRef={ticketRecordRef} />
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
          startIcon={<i class="bi bi-plus-circle-dotted"></i>}
          color="info"
          className="create-ticket-btn"
          onClick={showTicketModal}
        >
          Raise Ticket
        </Button>

        {createTicketModal ? (
          <Modal open={createTicketModal} onClose={closeTicketModal}>
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
                    border: "2px solid lightgray"
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
                    onClick={closeTicketModal}
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
      </div>
    </>
  );
}

export default Customer;
