import React, { useState } from "react";
import "./styles.css";

//　コメント追加
export const App = () => {
  const [todoText, setTodoText] = useState("");
  ////// const [incompleteTodos, setIncompleteTodos] = useState([]);
  //// const [completeTodos, setCompleteTodos] = useState([]);
  const [todoLogs, setTodoLogs] = useState([]);
  const [doingLogs, setDoingLogs] = useState([]);
  const [doneLogs, setDoneLogs] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...todoLogs, todoText];
    setTodoLogs(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...todoLogs];
    newTodos.splice(index, 1);
    setTodoLogs(newTodos);
  };

  // const onClickComplete = (index) => {
  const onClickStart = (index) => {
    const newtodoLogs = [...todoLogs];
    newtodoLogs.splice(index, 1);
    setTodoLogs(newtodoLogs);

    const newdoingLogs = [...doingLogs, todoLogs[index]];
    setDoingLogs(newdoingLogs);
  };

  const onClickComplete = (index) => {
    const newdoingLogs = [...doingLogs];
    newdoingLogs.splice(index, 1);
    setDoingLogs(newdoingLogs);

    const newdoneLogs = [...doneLogs, doingLogs[index]];
    setDoneLogs(newdoneLogs);
  };

  const onClickBack = (index) => {
    const newdoingLogs = [...doingLogs];
    newdoingLogs.splice(index, 1);
    setDoingLogs(newdoingLogs);

    const newtodoLogs = [...todoLogs, doingLogs[index]];
    setTodoLogs(newtodoLogs);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="バックログを入力"
          value={todoText}
          onChange={onChangeTodoText}
          disabled={todoLogs.length + doingLogs.length >= 3}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      {todoLogs.length + doingLogs.length >= 3 && (
        <p>登録できるバックログは3個までです</p>
      )}
      <div className="backlog1">
        <div className="todo-area">
          <p className="title">TODO</p>
          <ul>
            {todoLogs.map((todo, index) => {
              return (
                <div key={todo.id} className="list-row">
                  <li>{todo}</li>
                  <button onClick={() => onClickStart(index)}>着手</button>
                  <button onClick={() => onClickDelete(index)}>削除</button>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="doing-area">
          <p className="title">DOING</p>
          <ul>
            {doingLogs.map((todo, index) => {
              return (
                <div key={todo.id} div className="list-row">
                  <li>{todo}</li>
                  <button onClick={() => onClickComplete(index)}>完了</button>
                  <button onClick={() => onClickBack(index)}>戻す</button>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="done-area">
          <p className="title">DONE</p>
          <ul>
            {doneLogs.map((todo) => {
              return (
                <div key={todo.id} div className="list-row">
                  <li>{todo}</li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
