import { Todo } from "../Todo/todo.jsx";
import { InputAdd } from "../InputAdd/inputAdd.jsx";
import styles from "../../../../styles/main.module.sass";
import { themes } from "../../../../public/themes/themes.js";
import { ThemeContext } from "../../page.js";
import { useState, useContext } from "react";
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

  // useEffect(() => {
  //   const local = JSON.parse(localStorage.getItem("todos"));
  //   if (local) setListTodo(local);
  // }, []);

  const handleInput = function (listName, listId) {
    const updatedListName = listsTodo.map((list) => {
      if (list.id == listId) {
        return { id: list.id, name: listName, items: [...list.items] };
      }
      return list;
    });

    // localStorage.setItem(
    //   "todos",
    //   JSON.stringify({ ...listsTodo, name: listName })
    // );
    setListsTodo(updatedListName);
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

  function addTodo(e) {
    const list = e.target.parentElement.parentNode;
    const listId = e.target.parentElement.parentNode.attributes["id"].value;
    console.log(list);
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
              />
            </ul>
          </div>
        );
      })}
    </>
  );
}
