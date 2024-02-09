"use client";
import { useEffect, useState } from "react";
import styles from "../../../../styles/main.module.sass";
import stylesTodo from "../../../../styles/todo.module.sass";
import { ListsTodo } from "../listsTodo/ListsTodo";

export const Main = () => {
  const [listsTodo, setListTodo] = useState([
    {
      name: "Segunda-feira",
      items: [
        {
          id: 0,
          name: "item 1",
          status: false,
        },
        {
          id: 1,
          name: "item 2",
          status: false,
        },
      ],
    },
    {
      name: "Terça-feira",
      items: [
        {
          id: 0,
          name: "item 1",
          status: false,
        },
        {
          id: 1,
          name: "item 2",
          status: false,
        },
      ],
    },
    {
      name: "Quarta-feira",
      items: [
        {
          id: 0,
          name: "item 1",
          status: false,
        },
        {
          id: 1,
          name: "item 2",
          status: false,
        },
      ],
    },
  ]);

  // useEffect(() => {
  //   const local = JSON.parse(localStorage.getItem("todos"));
  //   if (local) setListTodo(local);
  // }, []);

  const handleInput = (e) => {
    let listName = e.target.value;
    localStorage.setItem(
      "todos",
      JSON.stringify({ ...listsTodo, name: listName })
    );
    setListTodo({
      name: listName,
      items: listsTodo.items === undefined ? [] : [...listsTodo.items],
    });
  };

  function addListTodo(newTodo) {
    const todosItems =
      listsTodo.items === undefined ? newTodo : [...listsTodo.items, newTodo];
    setListTodo({ ...listsTodo, items: todosItems });
    localStorage.setItem(
      "todos",
      JSON.stringify({ ...listsTodo, items: todosItems })
    );
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
          id: self.crypto.randomUUID(), 
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
        <section className={styles.lists}>
          <ListsTodo listsProp={listsTodo} addTodo={addTodo} handleInput={handleInput} />
        </section>
      </main>
    </>
  );
};
