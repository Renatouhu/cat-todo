import { currentTheme } from "../../../../public/themes/themes";

export const InputAdd = ({ addTodo, handleInput, value }) => {
  return (
    <>
      <input
        onChange={handleInput}
        placeholder="Add a Title to your List"
        value={value}
        style={{ color: currentTheme.colors.onSurface }}
      />
      <button
        onClick={addTodo}
        style={{ color: currentTheme.colors.onSurface }}
      >
        Add+
      </button>
    </>
  );
};
