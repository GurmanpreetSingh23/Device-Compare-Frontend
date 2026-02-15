import axios from "axios";
import { BASE_URL } from "./Base_api";

const Instane = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default Instane;
