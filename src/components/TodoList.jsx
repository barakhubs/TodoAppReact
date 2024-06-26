import React, { useEffect, useState } from "react";
import { getTodos } from "../services/TodoService";
import List from "./List";
import Spinner from "./Spinner";
import { FaExclamationTriangle } from "react-icons/fa";
import NewTodo from "./NewTodo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isSortAsc, setIsSortAsc] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  // get todos
  const fetchTodos = async () => {
    try {
      const data = await getTodos({ filter, sortOrder });
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filter, sortOrder]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortByTitle = () => {
    setIsSortAsc(!isSortAsc);
    isSortAsc ? setSortOrder("asc") : setSortOrder("desc");
  };

  const handleSortByDate = (sort) => {
    setSortOrder(sort);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <NewTodo refreshTodos={fetchTodos} />
          <div className="row m-1 p-3 px-5 justify-content-end">
            <div className="col-auto d-flex align-items-center">
              <label className="text-secondary my-2 pr-2 view-opt-label">
                Filter
              </label>
              <select
                className="custom-select custom-select-sm btn my-2"
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="active">Completed</option>
                <option value="inactive">Incomplete</option>
              </select>
            </div>
            <div className="col-auto d-flex align-items-center px-1 pr-3">
              <label className="text-secondary my-2 pr-2 view-opt-label">
                Sort
              </label>
              <select
                className="custom-select custom-select-sm btn my-2"
                onChange={(e) => handleSortByDate(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
              {isSortAsc ? (
                <i
                  className="fa fa fa-sort-amount-asc text-info btn mx-0 px-0 pl-1"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Ascending"
                  onClick={handleSortByTitle}
                ></i>
              ) : (
                <i
                  className="fa fa fa-sort-amount-desc text-info btn mx-0 px-0 pl-1"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Descending"
                  onClick={handleSortByTitle}
                ></i>
              )}
            </div>
          </div>

          <div className="row mx-1 px-5 pb-3 w-80">
            <div className="col mx-auto">
              {todos.map((todo) => (
                <List key={todo.id} todo={todo} refreshTodos={fetchTodos} />
              ))}
            </div>

            {todos.length <= 0 && (
              <div className="col px-1 m-1 d-flex align-items-center">
                <p>No todos found!</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default TodoList;
