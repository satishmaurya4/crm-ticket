import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import TicketCountCard from "../components/TicketCountCard";
import { fetchTickets, ticketUpdation } from "../api/tickets";
import TicketTable from "../components/TicketTable";
import TicketModal from "../components/UI/modals/TicketModal";
import { logout } from "../utils/logout";
import RecordLoader from "../components/UI/RecordLoader";
import Toast from "../components/Toast";

const Engineer = () => {
  const [ticketModal, setTicketModal] = useState(false);
  const [ticketsCount, setTicketsCount] = useState({});
  const [allTicket, setAllTicket] = useState([]);
  const [openTicket, setOpenTicket] = useState([]);
  const [pendingTicket, setPendingTicket] = useState([]);
  const [closedTicket, setClosedTicket] = useState([]);
  const [blockedTicket, setBlockedTicket] = useState([]);
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
  const [selectedCurrTicketStatus, setSelectedCurrTicketStatus] = useState("");

  const [apiMessage, setApiMessage] = useState("");
  const [showRecordLoader, setShowRecordLoader] = useState(false);
  const [openToast, setOpenToast] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const ticketRecordRef = useRef();
  const topRef = useRef();

  const fetchAllTickets = () => {
    setShowRecordLoader(true);
    fetchTickets()
      .then((response) => {
        setShowRecordLoader(false);
        if (response.status === 200) {
          const data = response.data;
          const getOpenTicket = data.filter((ticket) => {
            return ticket.status === "OPEN";
          });
          const getPendingTicket = data.filter((ticket) => {
            return ticket.status === "IN_PROGRESS";
          });
          const getClosedTicket = data.filter((ticket) => {
            return ticket.status === "CLOSED";
          });
          const getBlockedTicket = data.filter((ticket) => {
            return ticket.status === "BLOCKED";
          });
          setAllTicket(data);
          setOpenTicket(getOpenTicket);
          setClosedTicket(getClosedTicket);
          setPendingTicket(getPendingTicket);
          setBlockedTicket(getBlockedTicket);
          updateTicketCount(data);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          logout();
        }
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
    tickets.forEach(function (ticket) {
      data.all += 1;
      switch (ticket.status) {
        case "OPEN":
          return (data.open += 1);
        case "IN_PROGRESS":
          return (data.pending += 1);
        case "CLOSED":
          return (data.closed += 1);
        case "BLOCKED":
          return (data.blocked += 1);
        default:
          return;
      }
    });
    setTicketsCount(data);
  };
  const editTicket = (ticketDetail) => {
    const ticket = {
      id: ticketDetail.id,
      title: ticketDetail.title,
      description: ticketDetail.description,
      reporter: ticketDetail.reporter,
      assignee: ticketDetail.assignee,
      ticketPriority: ticketDetail.ticketPriority,
    };
    setSelectedCurrTicketStatus(ticketDetail.status);
    setSelectedCurrTicket(ticket);
    setTicketModal(true);
  };
  const onTicketUpdate = (event) => {
    if (event.target.id === "title") {
      selectedCurrTicket.title = event.target.value;
    } else if (event.target.id === "description") {
      selectedCurrTicket.description = event.target.value;
    } else if (event.target.id === "ticketPriority") {
      selectedCurrTicket.ticketPriority = event.target.value;
    } else if (event.target.id === "status") { 

    }
    updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket));
  };

  const updateSelectedCurrTicket = (data) => setSelectedCurrTicket(data);

  const updateTicket = (e) => {
    e.preventDefault();
    onCloseTicketModal();
    setShowRecordLoader(true);
    const data = { ...selectedCurrTicket, status: selectedCurrTicketStatus }
    ticketUpdation(selectedCurrTicket.id, data)
      .then(function (response) {
        setApiMessage({
          status: 'success',
          message: "Ticket Updated Successfully"
        });
        setOpenToast({
          ...openToast,
          open: true,
        })
        setShowRecordLoader(false);
        fetchAllTickets();
      })
      .catch(function (error) {
        if (error.status === 400) {
          setApiMessage({
            status: 'error',
            message: error.message,
          });
          setOpenToast({
            ...openToast,
            open: true,
          })
        }
        else if (error.response.status === 401) {
          logout();
          setApiMessage({
            status: 'error',
            message: "Authorization error, retry loging in"
          });
          setOpenToast({
            ...openToast,
            open: true,
          })
        }
        onCloseTicketModal();
      });
  };
  const onCloseTicketModal = () => {
    setTicketModal(false);
  };

  const sidebarStyle = {
    bg: {
      backgroundColor: "var(--engineer-content-color)",
    },
    logo: {
      backgroundColor: "rgb(92,38,2)",
    },
  };
  useEffect(() => {
    (async () => {
      fetchAllTickets();
    })();
  }, []);
  return (
    <>
      {
        showRecordLoader ? <RecordLoader /> : <Toast info={apiMessage} openToast={openToast} setOpenToast={setOpenToast} />      
      }
    <div className="page-container" ref={topRef}>
      <Sidebar sidebarStyle={sidebarStyle} ticketRef={ticketRecordRef} topRef={topRef}/>
      <h3
        className="engineer-title text-center"
        style={{ color: "var(--engineer-content-color)" }}
      >
        Welcome, {localStorage.getItem("name")}
      </h3>
      <p className="admin-sub-title text-center">
        Take a quick look at your status below
      </p>

      <div className="records" ref={ticketRecordRef}>
        <h4
          className="records-title"
          style={{ background: "var(--engineer-content-bg-gradient)" }}
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
            engineer
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
      <TicketModal
        ticketModal={ticketModal}
        onCloseTicketModal={onCloseTicketModal}
          selectedCurrTicket={selectedCurrTicket}
          selectedCurrTicketStatus={selectedCurrTicketStatus}
          setSelectedCurrTicketStatus={setSelectedCurrTicketStatus}
        onTicketUpdate={onTicketUpdate}
        updateTicket={updateTicket}
        engineer
      />
      </div>
      </>
  );
};

export default Engineer;
