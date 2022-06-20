import "../styles/Admin.css";
import Sidebar from "../components/Sidebar";
import MaterialTable from "@material-table/core";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchTickets, ticketUpdation } from "../api/tickets";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { getAllUsers } from "../api/users";
import TicketCountCard from "../components/TicketCountCard";

// showing some representational data
// graphs: to show statistic data
// access : view all the users
// admin => engineer => approve/decline/assing => change the status

// admin: tickets : view all the tickets

// edit details

const Admin = () => {
  const [userModal, setUserModal] = useState(false);
  const [ticketModal, setTicketModal] = useState(false);
  const [ticketList, setTicketList] = useState([]);
  const [allUserDetails, setAllUserDetails] = useState([]);
  const [ticketDetails, setTicketDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [ticketId, setTicketId] = useState(null);
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
  const [ticketsCount, setTicketsCount] = useState({});
  // const [inputValue, setInputValue] = useState({
  //   title: '',
  //   description: '',
  //   reporter: '',
  //   ticketPriority: '',
  //   status: ''
  // })

  const updateUser = (a, b) => {
    console.log("event", a);
    console.log("row data", b);
    setUserModal(true);
  };

  const updateSelectedCurrTicket = (data) => setSelectedCurrTicket(data);

  const editTicket = (rowData) => {
    // setTicketId(rowData.id);
    // inputValue["title"] = rowData.title;
    // console.log(rowData.title)
    const ticket = {
      id: rowData.id,
      title: rowData.title,
      description: rowData.description,
      reporter: rowData.reporter,
      assignee: rowData.assignee,
      ticketPriority: rowData.ticketPriority,
      status: rowData.status,
    };
    setSelectedCurrTicket(ticket);
    setTicketModal(true);
  };

  const onTicketUpdate = (e) => {
    if (e.target.id === "title") {
      selectedCurrTicket.title = e.target.value;
    } else if (e.target.id === "description") {
      selectedCurrTicket.description = e.target.value;
    } else if (e.target.id === "assignee") {
      selectedCurrTicket.assignee = e.target.value;
    } else if (e.target.id === "reporter") {
      selectedCurrTicket.reporter = e.target.value;
    } else if (e.target.id === "ticketPriority") {
      selectedCurrTicket.ticketPriority = e.target.value;
    } else {
      selectedCurrTicket.status = e.target.value;
    }
    updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket));
  };

  const updateTicket = (e) => {
    e.preventDefault();
    ticketUpdation(selectedCurrTicket.id, selectedCurrTicket)
      .then(function (response) {
        setTicketList(response.data);
        onCloseTicketModal();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const closeUserModal = () => {
    setUserModal(false);
  };

  const onCloseTicketModal = () => {
    setTicketModal(false);
  };

  useEffect(() => {
    (async () => {
      fetchTicket();
      getUsers();
    })();
  }, []);

  const fetchTicket = () => {
    fetchTickets()
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
          setTicketList(response.data);
          updateTicketCount(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsers = () => {
    getAllUsers()
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
          setAllUserDetails(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("ticket details", ticketDetails);

  const updateTicketCount = (tickets) => {
    const data = {
      open: 0,
      pending: 0,
      closed: 0,
      blocked: 0,
    };
    tickets.forEach((ticket) => {
      switch (ticket.status) {
        case "OPEN":
          data.open += 1;
          console.log("open");
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
          console.log("This is default case");
      }
    });
    setTicketsCount(data);
  };

  return (
    <div className="bg-light">
      <div className="row w-100">
        <div className="col-1">
          <Sidebar />
        </div>
        <div className="container col">
          <h3 className="text-primary text-center">Welcome Admin</h3>
          <p className="text-muted text-center">
            Take a quick look at your status below
          </p>

          {/* STATS CARDS START HERE */}
          <div className="row my-5">
            <div className="col my-1">
              <div className="row">
                <TicketCountCard status="open" count={ticketsCount.open} />
                <TicketCountCard status="closed" count={ticketsCount.closed} />
                <TicketCountCard
                  status="pending"
                  count={ticketsCount.pending}
                />
                <TicketCountCard
                  status="blocked"
                  count={ticketsCount.blocked}
                />
              </div>
              <hr />
              <div className="container my-4">
                <MaterialTable
                  onRowClick={(event, rowData) => editTicket(rowData)}
                  columns={[
                    {
                      title: "Ticket ID",
                      field: "id",
                    },
                    {
                      title: "TITLE",
                      field: "title",
                    },
                    {
                      title: "DESCRIPTION",
                      field: "description",
                    },
                    {
                      title: "REPORTER",
                      field: "reporter",
                    },
                    {
                      title: "PRIORITY",
                      field: "ticketPriority",
                    },
                    {
                      title: "Assignee",
                      field: "assignee",
                    },

                    {
                      title: "Status",
                      field: "status",
                      lookup: {
                        OPEN: "OPEN",
                        BLOCKED: "BLOCKED",
                        CLOSED: "CLOSED",
                        IN_PROGRESS: "IN_PROGRESS",
                      },
                    },
                  ]}
                  options={{
                    filtering: true,
                    exportMenu: [
                      {
                        label: "Export Pdf",
                        exportFunc: (cols, datas) =>
                          ExportPdf(cols, datas, "Ticket Records"),
                      },
                      {
                        label: "Export Csv",
                        exportFunc: (cols, datas) =>
                          ExportCsv(cols, datas, "Ticket Records"),
                      },
                    ],
                    headerStyle: {
                      backgroundColor: "darkblue",
                      color: "#fff",
                    },
                    rowStyle: {
                      backgroundColor: "lightgray",
                    },
                  }}
                  data={ticketList}
                  title="TICKET RECORDS"
                />
              </div>
              <div className="container mb-4">
                <MaterialTable
                  onRowClick={(event, rowData) => updateUser(event, rowData)}
                  columns={[
                    {
                      title: "NAME",
                      field: "name",
                    },
                    {
                      title: "USER ID",
                      field: "userId",
                    },
                    {
                      title: "EMAIL",
                      field: "email",
                    },
                    {
                      title: "USER TYPES",
                      field: "userTypes",
                    },
                    {
                      title: "USER STATUS",
                      field: "userStatus",
                    },
                  ]}
                  options={{
                    exportMenu: [
                      {
                        label: "Export Pdf",
                        exportFunc: (cols, datas) =>
                          ExportPdf(cols, datas, "User Records"),
                      },
                      {
                        label: "Export Csv",
                        exportFunc: (cols, datas) =>
                          ExportCsv(cols, datas, "User Records"),
                      },
                    ],
                    headerStyle: {
                      backgroundColor: "darkblue",
                      color: "#fff",
                    },
                    rowStyle: {
                      backgroundColor: "lightgray",
                    },
                  }}
                  data={allUserDetails}
                  title="USER RECORDS"
                />
              </div>
              <Modal
                show={ticketModal}
                onHide={onCloseTicketModal}
                backdrop="static"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <div className="p-1">
                      <div className="input-group">
                        <label className="input-group-text">
                          Ticket ID:{selectedCurrTicket.id}
                        </label>
                      </div>
                      <div className="input-group">
                        <label className="input-group-text">
                          Title
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={selectedCurrTicket.title}
                            onChange={onTicketUpdate}
                          />
                        </label>
                      </div>
                      <div className="input-group">
                        <label className="input-group-text">
                          Description
                          <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={selectedCurrTicket.description}
                            onChange={onTicketUpdate}
                          />
                        </label>
                      </div>
                      <div className="input-group">
                        <label className="input-group-text">
                          Reporter
                          <input
                            type="text"
                            className="form-control"
                            id="reporter"
                            value={selectedCurrTicket.reporter}
                            onChange={onTicketUpdate}
                          />
                        </label>
                      </div>
                      <div className="input-group">
                        <label className="input-group-text">
                          Priority
                          <input
                            type="text"
                            className="form-control"
                            id="ticketPriority"
                            value={selectedCurrTicket.ticketPriority}
                            onChange={onTicketUpdate}
                          />
                        </label>
                      </div>
                      <div className="input-group">
                        <label className="input-group-text">
                          Assignee
                          <input
                            type="text"
                            className="form-control"
                            id="assignee"
                            value={selectedCurrTicket.assignee}
                            onChange={onTicketUpdate}
                          />
                        </label>
                      </div>
                      <div className="input-group">
                        <label className="input-group-text">
                          Status
                          <input
                            type="text"
                            className="form-control"
                            id="status"
                            value={selectedCurrTicket.status}
                            onChange={onTicketUpdate}
                          />
                        </label>
                      </div>
                    </div>
                  </form>
                  <button className="btn btn-primary" onClick={updateTicket}>
                    Save Changes
                  </button>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
