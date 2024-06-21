import React from "react";
import { FaCheckSquare } from "react-icons/fa";

const List = ({ todo }) => {
    const dateObject = new Date(todo.createdAt);

    const completeTodo = async (todoId) => {
        todo.isActive =!todo.isActive;
        todo.title = todo.title.trim();
        if (todo.title.length === 0) {
            todo.isActive = false;
        }
        setTodos(
            todos.map((item) => {
                if (item.id === todo.id) {
                    return todo;
                }
                return item;
            })
        );
    };


  return (
    <div className="row px-3 align-items-center todo-item rounded">
      <div className="col-auto m-1 p-0 d-flex align-items-center">
        <h2 className="m-0 p-0">
          {todo.isActive ? (
            <i
              className="fa fa-check-square-o text-primary btn m-0 p-0"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Mark as todo"
              onClick={completeTodo(todo.id)}
            ></i>
          ) : (
            <i
              className="fa fa-square-o text-primary btn m-0 p-0"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Mark as complete"
            ></i>
          )}
        </h2>
      </div>
      <div className="col px-1 m-1 d-flex align-items-center">
        <input
          type="text"
          className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3"
          readOnly
          value={todo.title}
          title={todo.title}
        />
      </div>
      <div className="col-auto m-1 p-0 px-3 d-none"></div>
      <div className="col-auto m-1 p-0 todo-actions">
        <div className="row d-flex align-items-center justify-content-end">
          <h5 className="m-0 p-0 px-2">
            <i
              className="fa fa-trash-o text-danger btn m-0 p-0"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Delete todo"
              onClick={deleteTodo(todo.id)}
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
              {dateObject.toLocaleString()}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
