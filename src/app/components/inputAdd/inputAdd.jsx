"use client";
import { themes } from "../../../../public/themes/themes";
import styles from "../../../../styles/main.module.sass";
import { useState, useContext } from "react";
import { ThemeContext } from "../../page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPen } from "@fortawesome/free-solid-svg-icons";

export const InputAdd = ({ addTodo, value, handleInputName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(value);
  let inputContent;
  const themeContext = useContext(ThemeContext);
  const themeId = themeContext["themeId"];

  if (isEditing) {
    inputContent = (
      <>
        <input
          value={inputText}
          placeholder="Add a Title to your List"
          style={{ color: themes[themeId].colors.onSurface }}
          onChange={(e) => setInputText(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faFloppyDisk}
          styles={{ color: themes[themeId].colors.onSurface }}
          onClick={(e) => {
            let listId =
              e.target.parentNode.parentElement.parentNode.className ==
              styles.todoHeader
                ? e.target.parentNode.parentElement.parentNode.parentElement
                    .attributes["id"].value
                : e.target.parentNode.parentElement.parentNode.attributes["id"]
                    .value; // I don't have pride of this
            handleInputName(inputText, listId);
            setIsEditing(false);
          }}
        />
      </>
    );
  } else {
    inputContent = (
      <>
        <label
          htmlFor="nameList"
          style={{ color: themes[themeId].colors.onSurface }}
        >
          {value}
        </label>
        <FontAwesomeIcon
          icon={faPen}
          onClick={() => setIsEditing(true)}
          styles={{ color: themes[themeId].colors.onSurface }}
        />
      </>
    );
  }

  return (
    <div className={styles.todoHeader}>
      <div>{inputContent}</div>
      <button
        onClick={addTodo}
        style={{ color: themes[themeId].colors.onSurface }}
      >
        Add+
      </button>
    </div>
  );
};
