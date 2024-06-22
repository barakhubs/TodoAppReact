import axios from "axios";
import { toast } from "react-toastify";

const APP_URL = "https://localhost:7273/api";

export const getTodos = async ({filter, sortOrder}) => {
    try {
        const res = await axios.get(`${APP_URL}/todos?filter=${filter}&sort=${sortOrder}`);
        return res.data;
    } catch (error) {
        toast.error("An error occured while getting todos");
        console.log(error);
    }
}

export const addTodo = async ({newTodo}) => {
    try {
        // console.log(newTodo)
        const res = await axios.post(`${APP_URL}/todos`, newTodo);
        toast.success("Todo added successfully");
        return res.data;
    } catch (error) {
        toast.error("An error occured while adding todo");
        console.log(error);
    }
}

export const completeTodo = async ({updatedTodo}) => {
    try {
        const res = await axios.put(`${APP_URL}/todos/${updatedTodo.id}`, updatedTodo);
        toast.success("Todo modified successfully");
        return res.data;
    } catch (error) {
        toast.error("An error occured while completing todo");
        console.log(error);
    }
}

export const deleteTodo = async ({todoId}) => {
    try {
        const res = await axios.delete(`${APP_URL}/todos/${todoId}`);
        toast.success("Todo deleted successfully");
        return res.data;
    } catch (error) {
        toast.error("An error occured while deleting todo");
        console.log(error);
    }
}