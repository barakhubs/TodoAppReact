import axios from "axios";
import { toast } from "react-toastify";

const APP_URL = "https://localhost:7273/api";

export const getTodos = async () => {
    try {
        const res = await axios.get(`${APP_URL}/todos`);
        return res.data;
    } catch (error) {
        toast.error("An error occured while getting todos");
        console.log(error);
    }
}

export const addTodo = async (todo) => {
    try {
        const res = await axios.post(`${APP_URL}/todos`, todo);
        toast.success("Todo added successfully");
        return res.data;
    } catch (error) {
        toast.error("An error occured while adding todo");
        console.log(error);
    }
}