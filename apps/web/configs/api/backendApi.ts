import axios from "axios";
import process from "process";

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_END_POINT,
    withCredentials: true,
});
