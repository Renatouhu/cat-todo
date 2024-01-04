"use client";
import { useEffect, useState } from "react";
import styles from "../../../../styles/main.module.sass";
import { Todo } from "../todo/todo.jsx"
import { InputAdd } from "../inputTodo/inputAdd";

export const Main = () => {
  const [desktop] = useState("Nome da Lista");
  const [listTodo, setListTodo] = useState({
    name: "Cat Todo List",
    items: [],
  });

  const handleInput = (e) => {
    setListTodo({
      name: e.target.value,
      items: listTodo.items
    })
  };

  function addTodo() {
    const list = document.querySelector(`.${styles.listTodos}`);
    const inputTodo = document.createElement("input");
    inputTodo.setAttribute("type", "text");
    inputTodo.setAttribute("placeholder", "Add a Todo");
    inputTodo.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const newTodo = { name: inputTodo.value, status: false };
        setListTodo((prevstate) => {
          const todos = prevstate.items;
          return {
            name: prevstate.name,
            items: [...todos, newTodo],
          };
        });
        list.removeChild(inputTodo);
      }
    });
    list.appendChild(inputTodo);
  }

  return (
    <>
      <main className={styles.main}>
        <section>
          <div className={styles.listName}>
            <InputAdd addTodo={addTodo} handleInput={handleInput}/>
            <ul className={styles.listTodos}>
               <Todo listTodo={listTodo}/>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};
