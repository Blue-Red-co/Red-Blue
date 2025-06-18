import axios from "axios"

const req = axios.create({
  baseURL: `http://16.170.163.114:3010`,
  headers: {
    'X-Custom-Header': 'foobar',
    "Apikey": "heloo"
  }
});
export default req

