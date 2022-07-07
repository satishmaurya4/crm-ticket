import axios from 'axios';
import { Consume } from '../context';
const BASE_URL = process.env.REACT_APP_SERVER_URL;
// const BASE_URL = "https://relevel-crm--backend.herokuapp.com";


export async function userSignup(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data);
}

export async function userSignin(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data);
}