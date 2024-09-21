import axios from 'axios';

const BASE_URL = '';

//https://dog.ceo/api/


export default axios.create({
    baseURL: BASE_URL
});

export const petAPI = axios.create({
    baseURL: 'https://api.petfinder.com/v2/',
    /* headers:{'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`} */
})



export const authAPI = axios.create({
    headers:{'Authorization': 'Bearer {YOUR_ACCESS_TOKEN}'}
})




export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});