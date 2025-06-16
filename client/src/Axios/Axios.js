import axios from "axios"

const req = axios.create({
  baseURL: 'http://localhost:3010',
  headers: {
    'X-Custom-Header': 'foobar',
    "Apikey": "heloo"
  }
});
export default req

