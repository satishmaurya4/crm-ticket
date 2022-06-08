import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;
// const BASE_URL = "https://relevel-crm--backend.herokuapp.com";


export async function userSignup(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data);
}

export async function userSignin(data) {
    console.log(data)
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data);
}