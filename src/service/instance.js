import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://632489b6bb2321cba92ed888.mockapi.io/',
})

export default instance;