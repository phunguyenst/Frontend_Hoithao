import axios from 'axios';
export default axios.create({
    // baseURL: 'http://localhost:8080/'
    baseURL: 'http://localhost:3307/',
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true
})