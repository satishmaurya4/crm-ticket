import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import Card from "./UI/Card";
import "../styles/TicketCountCard.css";

const TicketCountCard = ({ status, title, count, totalCount }) => {
  const CardClasses =
    status === "open"
      ? "open-ticket"
      : status === "closed"
      ? "success-ticket"
      : status === "pending"
      ? "pending-ticket"
      : "blocked-ticket";
  const CircularProgressbarStyle = {
    trailColor: "#fff",
    pathColor:
      status === "open"
        ? "blue"
        : status === "closed"
        ? "lime"
        : status === "pending"
        ? "orange"
        : "red",
  };
  const CommonStyles = {
    width: "120px",
    height: "160px",
    boxShadow: "0px 5px 10px rgba(0,0,0,.4),0px -2px 10px rgba(0,0,0,.2)",
    cursor: "pointer",
  };

  return (
    <Card
      className={`${CardClasses} stats-wrapper`}
      CommonStyles={CommonStyles}
    >
      <div className="card-content">
        <h5 className="card-title">{title}</h5>

        <div className="card-stats">
          <div className="count">{count}</div>
          <div className="progress-bar-wrapper">
            <div style={{ height: "40px", width: "40px" }}>
              <CircularProgressbar
                value={count}
                maxValue={totalCount}
                styles={buildStyles(CircularProgressbarStyle)}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TicketCountCard;
