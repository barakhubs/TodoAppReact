import React from "react";
import TodoList from "../components/TodoList";
import Header from "../components/Header";
import NewTodo from "../components/NewTodo";

const HomePage = () => {
  return (
    <div className="container m-5 p-2 rounded mx-auto bg-light shadow">
      <Header />
      <div className="p-2 mx-4 border-black-25 border-bottom"></div>
      
      <TodoList />
    </div>
  );
};

export default HomePage;
