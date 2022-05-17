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

  //文字数上限値の設定
  const inputTextNum = 24;

  //上限数の変数化
  const backLogNum = 20;

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

    const newtodoLogs = [doingLogs[index], ...todoLogs];
    setTodoLogs(newtodoLogs);
  };

  return (
    <>
      <div class="Header">
        <div class="input_alert">
          <div className="input-area">
            <input
              placeholder="バックログを入力"
              value={todoText}
              onChange={onChangeTodoText}
              disabled={todoLogs.length + doingLogs.length >= backLogNum}
            />
            <button
              onClick={onClickAdd}
              disabled={
                encodeURI(todoText).replace(/%../g, "*").length > inputTextNum
              }
            >
              追加
            </button>
          </div>
          {todoLogs.length + doingLogs.length >= backLogNum && (
            <div classname="alert">
              登録できるバックログは{backLogNum}個までです
            </div>
          )}
          {encodeURI(todoText).replace(/%../g, "*").length > inputTextNum && (
            <div classname="alert">
              登録できる文字数は{inputTextNum}バイトまでです。
              {encodeURI(todoText).replace(/%../g, "*").length - inputTextNum}
              バイト減らしてください。
            </div>
          )}
        </div>
        <div className="title_area">
          <p className="title">TODO</p>
          <p className="title">DOING</p>
          <p className="title">DONE</p>
        </div>
      </div>
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
                  <button onClick={() => onClickBack(index)}>戻す</button>
                  <button onClick={() => onClickComplete(index)}>完了</button>
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
