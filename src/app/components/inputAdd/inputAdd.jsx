export const InputAdd = ({addTodo, handleInput, value}) => {
  return (
    <>
      <input onChange={handleInput} placeholder="Add a Title to your List" value={value}/>
      <button onClick={addTodo} >
        Add+
      </button>
    </>
  );
};