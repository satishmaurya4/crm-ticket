import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import { logout } from "../utils/logout";
import { goToTicketRecord } from "../utils/goTo";
import { goToTop } from "../utils/goTo";

const Sidebar = ({ sidebarStyle:{bg,logo}, ticketRef, goToUserRecord, topRef, admin }) => {
  const navigate = useNavigate();
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
          <i className="bi bi-bricks"></i>
        </span>
        <span>Bricks</span>
      </div>
      <ul>
        <li className="list active">
          <div className="sidebar-item" onClick={()=>goToTop(topRef)}>
            <span className="icon">
              <i className="bi bi-speedometer2"></i>
            </span>
            <span className="title">Dashboard</span>
          </div>
        </li>
        <li className="list">
          <div className="sidebar-item" onClick={()=>goToTicketRecord(ticketRef)}>
            <span className="icon">
              <i className="bi bi-ticket-detailed"></i>
            </span>
            <span className="title">Ticket Records</span>
          </div>
        </li>
        {
          admin && 
       
        <li className="list">
          <div className="sidebar-item" onClick={goToUserRecord}>
            <span className="icon">
              <i className="bi bi-person"></i>
            </span>
            <span className="title">User Records</span>
          </div>
        </li>
             }
        <li className="list">
          <div className="sidebar-item" onClick={()=>logout(navigate)}>
            <span className="icon">
              <i className="bi bi-door-closed"></i>
            </span>
            <span className="title">Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
