import axios from "axios"

const abc = axios.create({
  baseURL: 'http://localhost:3010',
  timeout: 7000,
  headers: {
    'X-Custom-Header': 'foobar',
    "Apikey": "heloo"
  }
});
export default abc

