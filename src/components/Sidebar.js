import { green } from "@material-ui/core/colors";
import { useEffect } from "react";
import "../styles/sidebar.css";
import { logout } from "../utils/logout";
import { goToTicketRecord } from "../utils/goToTicketRecord";

const Sidebar = ({ sidebarStyle:{bg,logo}, ticketRef, goToUserRecord, admin }) => {
  
  const sidebarFn = () => {
    let list = document.querySelectorAll(".list");

    for (let i = 0; i < list.length; i++) {
      list[i].onclick = function () {
        let j = 0;
        while (j < list.length) {
          list[j++].className = "list";
        }
        list[i].className = "list active";
      };
    }
  };

  useEffect(() => {
    sidebarFn();
    let navigationEl = document.querySelector(".sidebar");

    navigationEl.onmouseover = function () {
      navigationEl.classList.add("active");
    };
    navigationEl.onmouseleave = function () {
      navigationEl.classList.remove("active");
    };
  }, []);

  return (
    <div className="sidebar" style={bg}>
      <div className="sidebar-logo" style={logo}>
        <span className="icon">
          <i class="bi bi-bricks"></i>
        </span>
        <span>Bricks</span>
      </div>
      <ul>
        <li class="list active">
          <div className="sidebar-item">
            <span class="icon">
              <i class="bi bi-speedometer2"></i>
            </span>
            <span class="title">Dashboard</span>
          </div>
        </li>
        <li class="list">
          <div className="sidebar-item" onClick={()=>goToTicketRecord(ticketRef)}>
            <span class="icon">
              <i class="bi bi-ticket-detailed"></i>
            </span>
            <span class="title">Ticket Records</span>
          </div>
        </li>
        {
          admin && 
       
        <li class="list">
          <div className="sidebar-item" onClick={goToUserRecord}>
            <span class="icon">
              <i class="bi bi-person"></i>
            </span>
            <span class="title">User Records</span>
          </div>
        </li>
             }
        <li class="list">
          <div className="sidebar-item" onClick={logout}>
            <span class="icon">
              <i class="bi bi-door-closed"></i>
            </span>
            <span class="title">Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
