"use client";
import { Todo } from "../Todo/todo.jsx";
import { InputAdd } from "../InputAdd/inputAdd.jsx";
import styles from "../../../../styles/main.module.sass";
import { themes } from "../../../../public/themes/themes.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../page.js";
import { useState, useContext, useEffect, Fragment, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../Button/Button.jsx";

export function ListsTodo() {
  const [listsTodo, setListsTodo] = useState([]);
  const themeId = useContext(ThemeContext)["themeId"];
  const actualTheme = themes[themeId];
  const hasPageBeenRendered = useRef(false);
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
    if (hasPageBeenRendered) {
      localStorage.setItem("ListsTodos", JSON.stringify(listsTodo));
    }
    hasPageBeenRendered.current = true;
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

  function deleteListTodo(e) {
    const listId = e.target.parentElement.attributes["id"].value;
    const updatedLists = listsTodo.filter((list) => list.id != listId);
    setListsTodo(updatedLists);
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
        list.children[1].removeChild(inputTodo);
      }
    });
    list.children[1].children < 1 ? (list.lastChild.innerHTML = "") : "";
    list.children[1].appendChild(inputTodo);
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
    const itemId = item.children[0].attributes["id"].value;
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
    const itemId =
      e.currentTarget.parentElement.firstChild.attributes["id"].value;
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
    color: actualTheme.colors.surfaceContainer,
  };

  const hoverOnStyle = {
    background: actualTheme.colors.surfaceContainer,
    border: `1px solid ${actualTheme.colors.onSurfaceAlt}`,
    color: actualTheme.colors.onSurface,
  };
  console.log(hoverOnStyle);
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
            <button
              className={styles.deleteButton}
              style={hoverOffStyle}
              onClick={deleteListTodo}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                viewBox="0 0 512 512"
              >
                <path
                  fill={actualTheme.colors.primary}
                  fillOpacity=".97"
                  d="m422.5 186.2-69 69.3 69.3-69c64.3-64.1 69.6-69.5 68.9-69.5-.1 0-31.3 31.2-69.2 69.2m-237 237-69 69.3 69.3-69c38-37.9 69.2-69.1 69.2-69.2 0-.7-5.4 4.6-69.5 68.9"
                />
                <path
                  fill={actualTheme.colors.primary}
                  d="M62.4 1.1C34.2 3.7 11 23.5 3 52-.6 65.1.2 81.2 5.2 94c5.4 13.8 7.6 16.2 82.4 90.5l71.5 71-69.1 69c-38 37.9-71.3 71.7-73.9 75C5.8 412.3.7 426.6.7 443c-.1 37.7 30.6 68 68.7 68 11.5 0 19.9-2 30.6-7.2l8.5-4.1 73.5-73.3 73.5-73.3 73.5 72.8c80.5 79.6 78.5 77.9 95.5 82.9 15.4 4.4 35.7 2.5 49.3-4.8 23.2-12.3 37.2-35.7 37.2-61.9 0-11.8-1.7-18.9-7.2-30.1-4.1-8.4-4.6-8.9-77.4-82.5l-73.3-74 73.3-73.5c67.5-67.8 73.5-74.1 77-80.7 10.3-20.1 10.2-44.8-.1-64.6-5.3-10.2-17.2-21.9-27.9-27.4C456.3-.6 436.5-2 418 5.2c-13.4 5.2-16.6 8.1-91.1 82.5l-71.6 71.4-66.4-67.2c-36.5-37-69.7-70-73.7-73.4C99.6 5 82.3-.6 62.4 1.1"
                />
                <path
                  fill={actualTheme.colors.primary}
                  fillOpacity=".57"
                  d="m324.5 89.2-69 69.3 69.3-69C389.1 25.4 394.4 20 393.7 20c-.1 0-31.3 31.2-69.2 69.2m-236 236-69 69.3 69.3-69c64.3-64.1 69.6-69.5 68.9-69.5-.1 0-31.3 31.2-69.2 69.2"
                />
                <path
                  fill={actualTheme.colors.primary}
                  fillOpacity=".3"
                  d="m422.5 187.2-69 69.3 69.3-69c38-37.9 69.2-69.1 69.2-69.2 0-.7-5.4 4.6-69.5 68.9M186 423.7l-68.5 68.8 68.8-68.5c63.9-63.7 69.1-69 68.4-69-.1 0-31 30.9-68.7 68.7"
                />
              </svg>
            </button>
          </div>
          {index === listsTodo.length - 1 && (
            <>
              <input
                placeholder="name your new list"
                style={{
                  backgroundColor: actualTheme.colors.surfaceContainer,
                  border: `1px solid ${actualTheme.colors.surfaceContainerHighest}`,
                  color: actualTheme.colors.onSurfaceAlt,
                }}
              ></input>
              <Button
                styleOnButton={hoverOnStyle}
                styleOffButton={hoverOffStyle}
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
        <label
          htmlFor="createList"
          style={{ color: actualTheme.colors.primaryContainer }}
        >
          Create New List
        </label>
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
