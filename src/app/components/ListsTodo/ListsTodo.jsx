"use client";
import { Todo } from "../Todo/todo.jsx";
import { InputAdd } from "../InputAdd/inputAdd.jsx";
import styles from "../../../../styles/main.module.sass";
import { themes } from "../../../../public/themes/themes.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../page.js";
import { useState, useContext, useEffect, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../Button/Button.jsx";

export function ListsTodo() {
  const [listsTodo, setListsTodo] = useState([]);
  const themeId = useContext(ThemeContext)["themeId"];
  const actualTheme = themes[themeId];

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage["ListsTodos"] != undefined
    ) {
      let listsLocal = JSON.parse(localStorage.getItem("ListsTodos"));
      if (listsLocal.length > 0) {
        setListsTodo(listsLocal);
      }
    }
  }, []);

  useEffect(() => {
    if (listsTodo.length > 0) {
      localStorage.setItem("ListsTodos", JSON.stringify(listsTodo));
    }
  }, [listsTodo]);

  const handleInput = function (listName, listId) {
    const updatedListName = listsTodo.map((list) => {
      if (list.id == listId) {
        return {
          id: list.id,
          name: listName,
          order: list.order,
          items: list.items == undefined ? undefined : [...list.items],
        };
      }
      return list;
    });
    setListsTodo(updatedListName);
  };

  function addListTodo(e) {
    const listName = e.currentTarget.previousElementSibling.value;
    if (listsTodo.length < 1) {
      setListsTodo([{ id: uuidv4(), name: listName, order: 1 }]);
    } else {
      setListsTodo([...listsTodo, { id: uuidv4(), name: listName, order: 2 }]);
    }
  }

  function addTodo(e) {
    const list = e.target.parentElement.parentNode;
    const listId = list.attributes["id"].value;
    const inputTodo = document.createElement("input");
    inputTodo.setAttribute("type", "text");
    inputTodo.setAttribute("placeholder", "Add a todo");
    inputTodo.setAttribute("style", `color: ${actualTheme.colors.onSurface}`);
    inputTodo.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const listNewTodoAdded = listsTodo.map((list) => {
          if (list.id == listId) {
            if (list.items != undefined) {
              return {
                id: list.id,
                name: list.name,
                order: list.order,
                items: [
                  ...list.items,
                  { id: uuidv4(), name: inputTodo.value, status: false },
                ],
              };
            }
            return {
              id: list.id,
              name: list.name,
              order: list.order,
              items: [{ id: uuidv4(), name: inputTodo.value, status: false }],
            };
          }
          return list;
        });
        setListsTodo(listNewTodoAdded);
        list.lastChild.removeChild(inputTodo);
      }
    });
    list.lastChild.children < 1 ? (list.lastChild.innerHTML = "") : "";
    list.lastChild.appendChild(inputTodo);
  }

  function handleChangeItemStatus(listId, itemId, status) {
    const listItemUpdated = listsTodo.map((list) => {
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
    setListsTodo(listItemUpdated);
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
    inputTodo.setAttribute("style", `color: ${actualTheme.colors.onSurface}`);
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

  let listsContent;

  const hoverOffStyle = {
    background: actualTheme.colors.onSurface,
    border: `1px solid ${actualTheme.colors.onSurface}`,
    color: actualTheme.colors.onSurfaceAlt,
  };

  const hoverOnStyle = {
    background: actualTheme.colors.surfaceContainer,
    border: `1px solid ${actualTheme.colors.onSurfaceAlt}`,
    color: actualTheme.colors.onSurface,
  };

  if (listsTodo.length > 0) {
    listsContent = listsTodo.map((list, index) => {
      return (
        <Fragment key={uuidv4()}>
          <div
            className={styles.list}
            id={list.id}
            order={list.order}
            style={{ backgroundColor: actualTheme.colors.surfaceContainer }}
          >
            <InputAdd
              addTodo={addTodo}
              value={list.name}
              handleInputName={handleInput}
            />
            <ul
              className={styles.listTodos}
              style={{
                backgroundColor: actualTheme.colors.surfaceContainerHighest,
                color: actualTheme.colors.onSurfaceAlt,
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
          {index === listsTodo.length - 1 && (
            <>
              <input
                placeholder="name your new list"
                style={{
                  backgroundColor: actualTheme.colors.surfaceContainer,
                  border: `1px solid ${actualTheme.colors.surfaceContainerHighest}`,
                }}
              ></input>
              <Button
                styleOffButton={hoverOffStyle}
                styleOnHover={hoverOnStyle}
                onClickFn={addListTodo}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add
              </Button>
            </>
          )}
        </Fragment>
      );
    });
  } else {
    listsContent = (
      <>
        <label htmlFor="createList">Create New List</label>
        <input
          placeholder="name your new list"
          style={{
            backgroundColor: actualTheme.colors.surfaceContainer,
            border: `1px solid ${actualTheme.colors.surfaceContainerHighest}`,
          }}
        ></input>
        <Button
          styleOffButton={hoverOffStyle}
          styleOnButton={hoverOnStyle}
          onClickFn={addListTodo}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add
        </Button>
      </>
    );
  }
  return <>{listsContent}</>;
}
