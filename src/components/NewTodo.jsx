import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../services/TodoService";
import { toast } from "react-toastify";

const NewTodo = ({refreshTodos}) => {
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTodo = {
            title,
        };
        
        try {
          await addTodo({newTodo});
          setTitle('');
          navigate(index);
        } catch (error) {
          console.log(error);
        } finally {
          refreshTodos();
          setLoading(false);
        }
    }

  return (
    <div className="row m-1 p-3">
      <div className="col col-11 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
            <div className="col">
              <input
                className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                type="text"
                placeholder="Add new todo.."
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-auto px-0 mx-0 mr-2">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTodo;
