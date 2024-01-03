"use client";
import { useState } from "react";
import styles from "../../../../styles/main.module.sass";
import { Todo } from "../todo/todo"

export const Main = () => {
  const [desktop] = useState("Nome da Lista");
  const [listTodo, setListTodo] = useState({
    name: "Cat Todo List",
    items: [],
  });

  const handleInput = (e) => {
    setListTodo({
      name: e.target.value,
      items: listTodo.items,
    });
  };

  function changeCheckbox(e) {
    let ischecked = e.target.className === styles.item;
    if (ischecked) {
      e.target.className += ` ${styles.itemChecked}`;
    } else {
      e.target.className = styles.item;
    }
  }

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
            <input onChange={handleInput} defaultValue={listTodo.name} />
            <button onClick={addTodo} className="">
              Add+
            </button>
            <ul className={styles.listTodos}>
                {listTodo.items.map((item, index) => {
                    let classCheckbox =
                      listTodo.items[index].status === true
                        ? `${styles.item} ${styles.itemChecked}`
                        : `${styles.item}`;
                    return (
                      <li key={index}>
                        <div
                          className={classCheckbox}
                          id="check-todo"
                          onClick={changeCheckbox}
                        />
                        <p>{item.name}</p>
                      </li>
                    );
                  })
                }
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};
