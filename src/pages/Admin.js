import { useEffect, useRef, useState } from "react";
import "../styles/Admin.css";
import Sidebar from "../components/Sidebar";
import { fetchTickets, ticketUpdation } from "../api/tickets";
import { getAllUsers, updateUserDetails } from "../api/users";
import TicketCountCard from "../components/TicketCountCard";
import TicketTable from "../components/TicketTable";
import UserTable from "../components/UserTable";
import TicketModal from "../components/UI/modals/TicketModal";
import UserModal from "../components/UI/modals/UserModal";
import { logout } from "../utils/logout";
import RecordLoader from "../components/UI/RecordLoader";

const Admin = () => {
  const [ticketModal, setTicketModal] = useState(false);
  const [allTicket, setAllTicket] = useState([]);
  const [openTicket, setOpenTicket] = useState([]);
  const [closedTicket, setClosedTicket] = useState([]);
  const [pendingTicket, setPendingTicket] = useState([]);
  const [blockedTicket, setBlockedTicket] = useState([]);
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
  const [selectedCurrTicketStatus, setSelectedCurrTicketStatus] = useState("");
  const [selectedCurrTicketAssignee, setSelectedCurrTicketAssignee] =useState("");
  const [ticketsCount, setTicketsCount] = useState({});

  const [userModal, setUserModal] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [approvedUser, setApprovedUser] = useState([]);
  const [pendingUser, setPendingUser] = useState([]);
  const [rejectedUser, setRejectedUser] = useState([]);
  const [usersCount, setUsersCount] = useState({});
  const [userDetail, setUserDetail] = useState({});

  const [message, setMessage] = useState("");
  const [showRecordLoader, setShowRecordLoader] = useState(false);

  const ticketRecordRef = useRef();
  const userRecordRef = useRef();
  const topRef= useRef();

  const fetchTicket = () => {
    fetchTickets()
      .then(function (response) {
        if (response.status === 200) {
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
          setAllTicket(response.data);
          updateTicketCount(response.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          logout();
        }
      });
  };

  const editTicket = (ticketDetail) => {
    const ticket = {
      id: ticketDetail.id,
      title: ticketDetail.title,
      description: ticketDetail.description,
      reporter: ticketDetail.reporter,
      ticketPriority: ticketDetail.ticketPriority,
    };
    setSelectedCurrTicketStatus(ticketDetail.status);
    setSelectedCurrTicketAssignee(ticketDetail.assignee);
    setSelectedCurrTicket(ticket);
    setTicketModal(true);
  };

  const onTicketUpdate = (e) => {
    if (e.target.id === "title") {
      selectedCurrTicket.title = e.target.value;
    } else if (e.target.id === "description") {
      selectedCurrTicket.description = e.target.value;
    } else if (e.target.id === "reporter") {
      selectedCurrTicket.reporter = e.target.value;
    } else if (e.target.id === "ticketPriority") {
      selectedCurrTicket.ticketPriority = e.target.value;
    } 
    updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket));
  };

  const updateSelectedCurrTicket = (data) => setSelectedCurrTicket(data);

  const updateTicket = (e) => {
    e.preventDefault();
    onCloseTicketModal();
    setShowRecordLoader(true);
    const updatedData = {
      ...selectedCurrTicket,
      status: selectedCurrTicketStatus,
      assignee: selectedCurrTicketAssignee,
    };
    ticketUpdation(selectedCurrTicket.id, updatedData)
      .then(function (response) {
        setShowRecordLoader(false);
        fetchTicket();
      })
      .catch(function (error) {
        if (error.response.status === 400) setMessage(error.message);
        else if (error.response.status === 401) logout();
        else setMessage(error.message);
      });
  };

  const onCloseTicketModal = () => {
    setTicketModal(false);
  };

  const updateTicketCount = (tickets) => {
    const data = {
      all: 0,
      open: 0,
      pending: 0,
      closed: 0,
      blocked: 0,
    };
    tickets.forEach((ticket) => {
      data.all += 1;
      switch (ticket.status) {
        case "OPEN":
          data.open += 1;
          break;
        case "IN_PROGRESS":
          data.pending += 1;
          break;

        case "CLOSED":
          data.closed += 1;
          break;

        case "BLOCKED":
          data.blocked += 1;
          break;

        default:
          return;
      }
    });
    setTicketsCount(data);
  };

  const fetchUsers = (userId) => {
    getAllUsers(userId)
      .then(function (response) {
        if (response.status === 200) {
          if (userId) {
            setUserDetail(response.data[0]);
            showUserModal();
          } else {
            const userList = response.data;
            const getApprovedUsers = userList.filter((user) => {
              return user.userStatus === "APPROVED";
            });
            const getPendingUsers = userList.filter((user) => {
              return user.userStatus === "PENDING";
            });
            const getRejectedUsers = userList.filter((user) => {
              return user.userStatus === "REJECTED";
            });
            setAllUser(userList);
            setApprovedUser(getApprovedUsers);
            setPendingUser(getPendingUsers);
            setRejectedUser(getRejectedUsers);
            updateUsersCount(response.data);
          }
        }
      })
      .catch((error) => {});
  };

  const showUserModal = () => {
    setUserModal(true);
  };

  const updateUser = () => {
    onCloseUserModal();
    setShowRecordLoader(true);
    const data = {
      userType: userDetail.userTypes,
      userStatus: userDetail.userStatus,
      userName: userDetail.name,
    };
    updateUserDetails(userDetail.userId, data)
      .then((res) => {
        if (res.status === 200) {
          setMessage(res.message);
          let idx = allUser.findIndex(
            (user) => user.userId === userDetail.userId
          );
          allUser[idx] = userDetail;
          setShowRecordLoader(false);
        }
      })
      .catch((err) => {
        if (err.status === 400) setMessage(err.message);
        else if (err.response.status === 401) logout();
        else setMessage(err.message);
      });
  };

  const onCloseUserModal = () => {
    setUserModal(false);
  };

  const updateUsersCount = (users) => {
    const data = {
      all: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
    };
    users.forEach((user) => {
      data.all += 1;
      switch (user.userStatus) {
        case "APPROVED":
          return (data.approved += 1);
        case "PENDING":
          return (data.pending += 1);
        case "REJECTED":
          return (data.rejected += 1);
        default:
          return;
      }
    });
    setUsersCount(data);
  };

  const changeUserDetail = (e) => {
    if (e.target.name === "status") userDetail.userStatus = e.target.value;
    else if (e.target.name === "name") userDetail.name = e.target.value;
    else if (e.target.name === "type") userDetail.userTypes = e.target.value;
    setUserDetail(userDetail);
    setUserModal(e.target.value);
  };

  const goToUserRecord = () => {
    window.scrollTo({
      top: userRecordRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const sidebarStyle = {
    bg: {
      backgroundColor: "var(--admin-content-color)",
    },
    logo: {
      backgroundColor: "rgb(0, 0, 83)",
    },
  };

  useEffect(() => {
    (async () => {
      fetchTicket();
      fetchUsers("");
    })();
  }, []);

  return (
    <>
      {
        showRecordLoader && <RecordLoader />
      }
    <div className="page-container" ref={topRef}>
      <Sidebar
        sidebarStyle={sidebarStyle}
        ticketRef={ticketRecordRef}
        goToUserRecord={goToUserRecord}
        topRef={topRef}
        admin
      />

      <h3
        className="admin-title text-center"
        style={{ color: "var(--admin-content-color)" }}
      >
        Welcome, {localStorage.getItem("name")}
      </h3>
      <p className="admin-sub-title text-center">
        Take a quick look at your status below
      </p>

      <div className="records" ref={ticketRecordRef}>
        <h4
          className="records-title"
          style={{ background: "var(--admin-content-bg-gradient)" }}
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
            admin
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

      <div className="records" ref={userRecordRef}>
        <h4
          className="records-title"
          style={{ background: "var(--admin-content-bg-gradient)" }}
        >
          <span className="records-title-ring"></span>
          <span>user records</span>
          <span className="records-title-ring"></span>
        </h4>
        <div className="records-stats">
          <UserTable
            fetchUsers={fetchUsers}
            userList={{
              all: allUser,
              approved: approvedUser,
              pending: pendingUser,
              rejected: rejectedUser,
            }}
            userRecordRef={userRecordRef}
          />
          <div className="ticket-stats">
            <TicketCountCard
              status="closed"
              title="approved"
              count={usersCount.approved}
              totalCount={usersCount.all}
            />
            <TicketCountCard
              status="pending"
              title="pending"
              count={usersCount.pending}
              totalCount={usersCount.all}
            />
            <TicketCountCard
              status="blocked"
              title="rejected"
              count={usersCount.rejected}
              totalCount={usersCount.all}
            />
          </div>
        </div>
      </div>
      <TicketModal
        ticketModal={ticketModal}
        onCloseTicketModal={onCloseTicketModal}
        selectedCurrTicket={selectedCurrTicket}
        onTicketUpdate={onTicketUpdate}
        allUser={allUser}
        updateTicket={updateTicket}
        selectedCurrTicketStatus={selectedCurrTicketStatus}
        setSelectedCurrTicketStatus={setSelectedCurrTicketStatus}
        selectedCurrTicketAssignee={selectedCurrTicketAssignee}
        setSelectedCurrTicketAssignee={setSelectedCurrTicketAssignee}
        admin
      />
      <UserModal
        userModal={userModal}
        onCloseUserModal={onCloseUserModal}
        updateUser={updateUser}
        userDetail={userDetail}
        changeUserDetail={changeUserDetail}
        admin
      />
      </div>
      </>
  );
};

export default Admin;
