"use client";
import { useEffect, useState } from "react";
import styles from "../../../../styles/main.module.sass";
import stylesTodo from "../../../../styles/todo.module.sass";
import { Todo } from "../Todo/Todo.jsx";
import { InputAdd } from "../inputAdd/inputAdd";

export const Main = () => {
  const [desktop] = useState("Nome da Lista");
  const [listTodo, setListTodo] = useState({
    name: "",
    items: [],
  });

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("todos"));
    if (local) setListTodo(local);
  }, []);

  // DEU CERTO?
  const handleInput = (e) => {
    let listName = e.target.value;
    localStorage.setItem("todos", JSON.stringify({...listTodo, name: listName }));
    setListTodo({
      name: listName,
      items: listTodo.items === undefined ? [] : [...listTodo.items]
    })
  };

  function addListTodo(newTodo) {
    const todosItems = listTodo.items === undefined ? newTodo : [...listTodo.items, newTodo];
    setListTodo({...listTodo, items: todosItems});
    localStorage.setItem("todos", JSON.stringify({...listTodo, items: todosItems}));
  }

  function addTodo() {
    const list = document.querySelector(`.${styles.listTodos}`);
    list.getElementsByClassName(stylesTodo.todosNull)[0] !== undefined
      ? (list.getElementsByClassName(stylesTodo.todosNull)[0].className +=
          " " + stylesTodo.todosNullHidden)
      : null;
    const inputTodo = document.createElement("input");
    inputTodo.setAttribute("type", "text");
    inputTodo.setAttribute("placeholder", "Add a Todo");
    inputTodo.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const newTodo = {
          id: self.crypto.randomUUID(), // VER ISSO AQUI
          name: inputTodo.value,
          status: false,
        };
        addListTodo(newTodo);
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
              <Todo listTodo={listTodo} />
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};
