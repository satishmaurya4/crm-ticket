import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const TicketCountCard = ({ status, count }) => {
  const CardClasses =
    status === "open"
      ? "bg-primary text-primary"
      : status === "closed"
      ? "bg-success text-success"
      : status === "pending"
      ? "bg-warning text-warning"
      : "bg-danger text-danger";
  const IconClasses =
    status === "open"
      ? "text-primary"
      : status === "closed"
      ? "text-success"
      : status === "pending"
      ? "text-warning"
      : "text-danger";
  const CircularProgressbarStyle = {
    trailColor: "#fff",
    pathColor:
      status === "open"
        ? "blue"
        : status === "closed"
        ? "green"
        : status === "pending"
        ? "orange"
        : "red",
  };
  const BordetBottom = {
    borderBottom: "4px solid",
    borderColor:
      status === "open"
        ? "#321FDB"
        : status === "closed"
        ? "#2EB85C"
        : status === "pending"
        ? "#F9B115"
        : "#E55353",
    borderRadius: "5px",
  };

  return (
    <div className="col">
      <div
        className={`card shadow ${CardClasses}  bg-opacity-25 transform-scale text-primary`}
        style={{ width: 12 + "rem" }}
      >
        <div className="card-body" style={BordetBottom}>
          <h5 className="card-subtitle text-uppercase">
            <i className={`bi bi-pen ${IconClasses} text-primary mx-2`}></i>
            {status}
          </h5>
          <hr />
          <div className="row">
            <div className="col">{count}</div>
            <div className="col">
              <div style={{ height: "20px", width: "20px" }}>
                <CircularProgressbar
                  value={count}
                  styles={buildStyles(CircularProgressbarStyle)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCountCard;
