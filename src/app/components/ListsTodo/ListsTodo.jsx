"use client";
import { Todo } from "../Todo/todo.jsx";
import { InputAdd } from "../InputAdd/inputAdd.jsx";
import styles from "../../../../styles/main.module.sass";
import { themes } from "../../../../public/themes/themes.js";
import { ThemeContext } from "../../page.js";
import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export function ListsTodo() {
  const [listsTodo, setListsTodo] = useState([
    {
      id: 0,
      name: "Segunda-feira",
      order: 1,
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
      id: 1,
      name: "Terça-feira",
      order: 2,
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
      id: 2,
      name: "Quarta-feira",
      order: 3,
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
  const themeContext = useContext(ThemeContext);
  const themeId = themeContext["themeId"];

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setListsTodo(JSON.parse(localStorage.getItem("ListsTodos")));
      console.log("GET LISTS TODOS");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ListsTodos", JSON.stringify(listsTodo));
  }, [listsTodo]);

  const handleInput = function (listName, listId) {
    const updatedListName = listsTodo.map((list) => {
      if (list.id == listId) {
        return { id: list.id, name: listName, items: [...list.items] };
      }
      return list;
    });
    setListsTodo(updatedListName);
  };

  // have to rework on this
  // function addListTodo(newTodo) {
  //   const todosItems =
  //     listsTodo.items === undefined ? newTodo : [...listsTodo.items, newTodo];
  //   setListTodo({ ...listsTodo, items: todosItems });
  //   localStorage.setItem(
  //     "todos",
  //     JSON.stringify({ ...listsTodo, items: todosItems })
  //   );
  // }

  function addTodo(e) {
    const list = e.target.parentElement.parentNode;
    const listId = e.target.parentElement.parentNode.attributes["id"].value;
    const inputTodo = document.createElement("input");
    inputTodo.setAttribute("type", "text");
    inputTodo.setAttribute("placeholder", "Add a todo");
    inputTodo.setAttribute(
      "style",
      `color: ${themes[themeId].colors.onSurface}`
    );
    inputTodo.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const listNewTodoAdded = listsTodo.map((list) => {
          if (list.id == listId) {
            return {
              id: list.id,
              name: list.name,
              items: [
                ...list.items,
                { id: uuidv4(), name: inputTodo.value, status: false },
              ],
            };
          }
          return list;
        });
        setListsTodo(listNewTodoAdded);
        list.lastChild.removeChild(inputTodo);
      }
    });
    list.lastChild.appendChild(inputTodo);
  }

  function handleChangeItemStatus(listId, itemId, status) {
    const itemUpdated = listsTodo.map((list) => {
      if (list.id == listId) {
        const itemsUpdated = list.items.map((item) => {
          if (item.id == itemId) {
            return {
              id: item.id,
              name: item.name,
              status: status,
            };
          }
          return item;
        });
        return {
          id: list.id,
          name: list.name,
          order: list.order,
          items: itemsUpdated,
        };
      }
      return list;
    });
    setListsTodo(itemUpdated);
  }

  function handleEditTodo(e, prevText) {
    const item = e.currentTarget.parentElement;
    const itemId = item.attributes["id"].value;
    const listId =
      e.currentTarget.parentElement.parentElement.parentElement.attributes["id"]
        .value;
    const inputTodo = document.createElement("input");
    inputTodo.value = prevText;
    inputTodo.setAttribute("type", "text");
    inputTodo.setAttribute("placeholder", "Edit Text");
    inputTodo.setAttribute(
      "style",
      `color: ${themes[themeId].colors.onSurface}`
    );
    item.innerHTML = "";
    item.appendChild(inputTodo);

    function updateTextTodo() {
      const listUpdated = listsTodo.map((list) => {
        if (list.id == listId) {
          const listItemUpdated = list.items.map((item) => {
            if (item.id == itemId) {
              return {
                id: item.id,
                name: inputTodo.value,
                status: item.status,
              };
            }
            return item;
          });
          return { ...list, items: listItemUpdated };
        }
        return list;
      });
      setListsTodo(listUpdated);
    }

    const image = document.createElement("button");
    image.onclick = updateTextTodo;
    image.classList = `${styles.saveText}`;
    item.appendChild(image);

    inputTodo.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        updateTextTodo();
      }
    });
  }

  function handleDeleteTodo(e) {
    const itemId = e.currentTarget.parentElement.attributes["id"].value;
    const listId =
      e.currentTarget.parentElement.parentElement.parentElement.attributes["id"]
        .value;
    const listDeletedItem = listsTodo.map((list) => {
      if (list.id == listId) {
        return {
          ...list,
          items: list.items.filter((item) => item.id != itemId),
        };
      }
      return list;
    });
    setListsTodo(listDeletedItem);
  }

  return (
    <>
      {listsTodo.map((list) => {
        let keyId = uuidv4();
        return (
          <div
            key={keyId}
            className={styles.list}
            id={list.id}
            order={list.order}
            style={{ backgroundColor: themes[themeId].colors.surfaceContainer }}
          >
            <InputAdd
              addTodo={addTodo}
              value={list.name}
              handleInputName={handleInput}
            />
            <ul
              className={styles.listTodos}
              style={{
                backgroundColor: themes[themeId].colors.surfaceContainerHighest,
                color: themes[themeId].colors.onSurfaceAlt,
              }}
            >
              <Todo
                listTodo={list}
                handleChangeItemStatus={handleChangeItemStatus}
                handleEditTodo={handleEditTodo}
                handleDeleteTodo={handleDeleteTodo}
              />
            </ul>
          </div>
        );
      })}
    </>
  );
}
