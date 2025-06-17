import axios from "axios"

const req = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}:3010`,
  headers: {
    'X-Custom-Header': 'foobar',
    "Apikey": "heloo"
  }
});
export default req

