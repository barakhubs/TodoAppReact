import React, { useEffect, useState } from "react";
import { getTodos } from "../services/TodoService";
import List from "./List";
import Spinner from "./Spinner";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState([]);
   
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
  return (
    <>
    { loading ? <Spinner /> : (
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
                <List key={todo.id} todo={todo}/>
            ))}
          {/* <div className="row px-3 align-items-center todo-item rounded">
            <div className="col-auto m-1 p-0 d-flex align-items-center">
              <h2 className="m-0 p-0">
                <i
                  className="fa fa-square-o text-primary btn m-0 p-0"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Mark as complete"
                ></i>
                <i
                  className="fa fa-check-square-o text-primary btn m-0 p-0 d-none"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Mark as todo"
                ></i>
              </h2>
            </div>
            <div className="col px-1 m-1 d-flex align-items-center">
              <input
                type="text"
                className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3"
                readOnly
                value="Renew car insurance"
                title="Renew car insurance"
              />
              <input
                type="text"
                className="form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none"
                value="Renew car insurance"
              />
            </div>
            <div className="col-auto m-1 p-0 px-3">
              <div className="row">
                <div className="col-auto d-flex align-items-center rounded bg-white border border-warning">
                  <i
                    className="fa fa-hourglass-2 my-2 px-2 text-warning btn"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title=""
                    data-original-title="Due on date"
                  ></i>
                  <h6 className="text my-2 pr-2">28th Jun 2020</h6>
                </div>
              </div>
            </div>
            <div className="col-auto m-1 p-0 todo-actions">
              <div className="row d-flex align-items-center justify-content-end">
                <h5 className="m-0 p-0 px-2">
                  <i
                    className="fa fa-pencil text-info btn m-0 p-0"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Edit todo"
                  ></i>
                </h5>
                <h5 className="m-0 p-0 px-2">
                  <i
                    className="fa fa-trash-o text-danger btn m-0 p-0"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Delete todo"
                  ></i>
                </h5>
              </div>
              <div className="row todo-created-info">
                <div className="col-auto d-flex align-items-center pr-2">
                  <i
                    className="fa fa-info-circle my-2 px-2 text-black-50 btn"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title=""
                    data-original-title="Created date"
                  ></i>
                  <label className="date-label my-2 text-black-50">
                    28th Jun 2020
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row px-3 align-items-center todo-item editing rounded">
            <div className="col-auto m-1 p-0 d-flex align-items-center">
              <h2 className="m-0 p-0">
                <i
                  className="fa fa-square-o text-primary btn m-0 p-0"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Mark as complete"
                ></i>
                <i
                  className="fa fa-check-square-o text-primary btn m-0 p-0 d-none"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Mark as todo"
                ></i>
              </h2>
            </div>
            <div className="col px-1 m-1 d-flex align-items-center">
              <input
                type="text"
                className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3 d-none"
                readOnly
                value="Sign up for online course"
                title="Sign up for online course"
              />
              <input
                type="text"
                className="form-control form-control-lg border-0 edit-todo-input rounded px-3"
                value="Sign up for online course"
              />
            </div>
            <div className="col-auto m-1 p-0 px-3 d-none"></div>
            <div className="col-auto m-1 p-0 todo-actions">
              <div className="row d-flex align-items-center justify-content-end">
                <h5 className="m-0 p-0 px-2 edit-icon">
                  <i
                    className="fa fa-pencil text-info btn m-0 p-0"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Edit todo"
                  ></i>
                </h5>
                <h5 className="m-0 p-0 px-2">
                  <i
                    className="fa fa-trash-o text-danger btn m-0 p-0"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Delete todo"
                  ></i>
                </h5>
              </div>
              <div className="row todo-created-info">
                <div className="col-auto d-flex align-items-center pr-2">
                  <i
                    className="fa fa-info-circle my-2 px-2 text-black-50 btn"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title=""
                    data-original-title="Created date"
                  ></i>
                  <label className="date-label my-2 text-black-50">
                    28th Jun 2020
                  </label>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
        </>
    )}
      
    </>
  );
};

export default TodoList;
