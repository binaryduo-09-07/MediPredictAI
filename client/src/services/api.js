import axios from "axios";

const API = axios.create({
    baseURL: "https://medipredictai-93u0.onrender.com",
});

export default API;