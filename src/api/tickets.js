import axios from "axios";
const BASE_URL = process.env.REACT_APP_SERVER_URL;

export async function fetchTickets(data) {
  return await axios.get(
    `${BASE_URL}/crm/api/v1/tickets`,
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    },
    {
      userId: localStorage.getItem("userId"),
    }
  );
}

export async function ticketCreation(data) {
  return await axios.post(`${BASE_URL}/crm/api/v1/tickets`, data, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
}

export async function ticketUpdation(id, data) {
  return await axios.put(
    `${BASE_URL}/crm/api/v1/tickets/${id}`,
    data,
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    },
    {
      userId: localStorage.getItem("userId"),
    }
  );
}
