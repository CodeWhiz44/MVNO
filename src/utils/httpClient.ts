import axios from "axios";

export const httpClient = axios.create({
    timeout: 5_000,
    headers: { "Content-Type": "application/json" },
});
