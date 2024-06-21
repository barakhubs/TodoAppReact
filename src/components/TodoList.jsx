import React, { useEffect, useState } from "react";
import { getTodos } from "../services/TodoService";
import List from "./List";
import Spinner from "./Spinner";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // get todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleCompleteTodo = (updatedTodo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
  };

  const handleRemoveTodo = (todo) => {
    setTodos(todos.filter(todoItem => todoItem.id !== todo));
  };

  return (
    <>
      {loading ? <Spinner /> : (
        <>
          <div className="row m-1 p-3 px-5 justify-content-end">
            <div className="col-auto d-flex align-items-center">
              <label className="text-secondary my-2 pr-2 view-opt-label">
                Filter
              </label>
              <select className="custom-select custom-select-sm btn my-2">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
                <option value="has-due-date">Has due date</option>
              </select>
            </div>
            <div className="col-auto d-flex align-items-center px-1 pr-3">
              <label className="text-secondary my-2 pr-2 view-opt-label">
                Sort
              </label>
              <select className="custom-select custom-select-sm btn my-2">
                <option value="added-date-asc">Added date</option>
                <option value="due-date-desc">Due date</option>
              </select>
              <i
                className="fa fa fa-sort-amount-asc text-info btn mx-0 px-0 pl-1"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Ascending"
              ></i>
              <i
                className="fa fa fa-sort-amount-desc text-info btn mx-0 px-0 pl-1 d-none"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Descending"
              ></i>
            </div>
          </div>

          <div className="row mx-1 px-5 pb-3 w-80">
            <div className="col mx-auto">
              {todos.map((todo) => (
                <List
                  key={todo.id}
                  todo={todo}
                  onComplete={handleCompleteTodo}
                  onRemove={handleRemoveTodo}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TodoList;
