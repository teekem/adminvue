import axios from 'axios'

const httpClient = axios.create({
    // baseURL: process.env.VUE_APP_BASE_URL,
    baseURL: 'http://localhost:8000/',
    timeout: 1000, // indicates, 1000ms ie. 1 second
    headers: {
        "Content-Type": "application/json",
        // anything you want to add to the headers
    }
});

export default httpClient;