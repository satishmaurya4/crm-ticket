import axios from 'axios'
const BASE_URL = process.env.REACT_APP_SERVER_URL;
// axios lib

//url : crm/api/v1/tickets

// method for CRUD operation
// header for authorization: token, crypto token, key: private, public, bearer token, encrypted token
// body hold data that will apply on api

// post api: allow the user to create a ticket
// url: crm/api/v1/tickets
// Authorization: x-access-token


// put api: allow the engineer or user to edit the ticket
// url: crm/api/v1/tickets+{id}

export async function fetchTickets(data) {
    return await axios.get(`${BASE_URL}/crm/api/v1/tickets`,
        {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        },
        {
            "userId" : localStorage.getItem('userId')
        }
    )
}
export async function ticketUpdation(id,data) {
    return await axios.put(`${BASE_URL}/crm/api/v1/tickets/${id}`,data,
        {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        },
        {
            "userId" : localStorage.getItem('userId')
        }
    )
}