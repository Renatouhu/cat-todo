"use client";
import { useEffect, useState } from "react";
import styles from "../../../../styles/main.module.sass";
import stylesTodo from "../../../../styles/todo.module.sass"
import { Todo } from "../todo/todo.jsx";
import { InputAdd } from "../inputTodo/inputAdd";

export const Main = () => {
  const [desktop] = useState("Nome da Lista");
  const [listTodo, setListTodo] = useState({ name: "", items: [] });

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("todos"));
    if (local) setListTodo(local);
  }, []);

  const handleInput = (e) => {
    let listName = e.target.value;
    localStorage.setItem("todos", JSON.stringify({ name: listName }));
    setListTodo({
      name: listName,
      items: [],
    });
  };

  function addListTodo(newTodo) {
    setListTodo((prevstate) => {
      const todos =
        prevstate.items === undefined ? newTodo : [...prevstate.items, newTodo];
      const todosObject = { name: prevstate.name, items: todos };
      localStorage.setItem("todos", JSON.stringify(todosObject));
      return todosObject;
    });
  }

  function addTodo() {
    const list = document.querySelector(`.${styles.listTodos}`);
    list.getElementsByClassName(stylesTodo.todosNull)[0].className += ' ' + stylesTodo.todosNullHidden
    const inputTodo = document.createElement("input");
    inputTodo.setAttribute("type", "text");
    inputTodo.setAttribute("placeholder", "Add a Todo");
    inputTodo.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const newTodo = { name: inputTodo.value, status: false };
        addListTodo(newTodo)
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
            <InputAdd
              addTodo={addTodo}
              handleInput={handleInput}
              value={listTodo.name}
            />
            <ul className={styles.listTodos}>
              <Todo listTodo={listTodo.items} />
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};
