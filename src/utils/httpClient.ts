import axios from "axios";
const BASE_URL = 'www.dffd.com'
export const httpClient = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {'accept': 'application/json'}
  });