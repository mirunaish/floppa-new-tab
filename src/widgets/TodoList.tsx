import React, { useCallback, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TextInputButton from "../components/TextInputButton";
import { FaPencil, FaPlus, FaX } from "react-icons/fa6";
import Card, { CardComponentProps } from "../components/Card";

interface Todo {
  id: string;
  name: string;
  done: boolean;
}

interface TodoItemProps extends Todo {
  removeTodo: (id: string) => void;
  setName: (name: string) => void;
  toggleDone: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  name,
  setName,
  done,
  toggleDone,
  removeTodo,
}) => {
  const [editing, setEditing] = useState(false);

  const submit = useCallback(
    (newName: string) => {
      setName(newName);
      setEditing(false);
    },
    [setName]
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "6px 1rem",
        borderBottom: "1px solid var(--primaryAltTransparent)",
      }}
    >
      <input
        type="checkbox"
        checked={done}
        onChange={() => toggleDone(id)}
        style={{ marginRight: 6, flexShrink: 0 }}
        disabled={editing}
      />

      {!editing ? (
        <span
          className={done ? "alt-text" : ""}
          style={{
            marginLeft: 5,
            textDecoration: done ? "line-through" : "none",
            flexGrow: 1,
          }}
        >
          {name}
        </span>
      ) : (
        <TextInputButton
          type="textarea"
          onEnter={submit}
          cancel={() => setEditing(false)}
          initialValue={name}
        />
      )}

      {!editing ? (
        <>
          <FaPencil
            onClick={() => setEditing(true)}
            className="alt-text"
            style={{
              cursor: "pointer",
              marginLeft: 10,
              flexShrink: 0,
            }}
          />

          <FaX
            onClick={() => removeTodo(id)}
            className="alt-text"
            style={{
              cursor: "pointer",
              marginLeft: 10,
              flexShrink: 0,
            }}
          />
        </>
      ) : null}
    </div>
  );
};

const TodoList: React.FC<CardComponentProps> = ({ id, close }) => {
  const [todoList, setTodoList] = useLocalStorage<Todo[]>("todoList", []);
  // [ { id: string, name: string, done: boolean } ]

  const addTodo = useCallback(
    (todo: string) => {
      setTodoList([
        ...todoList,
        { id: crypto.randomUUID(), name: todo, done: false },
      ]);
    },
    [setTodoList, todoList]
  );

  const removeTodo = useCallback(
    (id: string) => {
      const newTodoList = todoList.filter((t) => t.id !== id);
      setTodoList(newTodoList);
    },
    [setTodoList, todoList]
  );

  const editTodo = useCallback(
    (id: string, name: string) => {
      const newTodoList = todoList.map((t) =>
        t.id === id ? { ...t, name } : t
      );
      setTodoList(newTodoList);
    },
    [setTodoList, todoList]
  );

  const toggleDone = useCallback(
    (id: string) => {
      const newTodoList = todoList.map((t) => {
        if (t.id === id) {
          return { ...t, done: !t.done };
        }
        return t;
      });
      setTodoList(newTodoList);
    },
    [setTodoList, todoList]
  );

  return (
    <Card
      id={id}
      title="todo list"
      close={close}
      resizeable="nwse"
      padding={false}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "0.6rem 0rem",
          height: "fit-content",
        }}
      >
        {todoList.map((todo) => (
          <TodoItem
            {...todo}
            key={todo.id}
            removeTodo={removeTodo}
            setName={(name) => editTodo(todo.id, name)}
            toggleDone={toggleDone}
          />
        ))}
        <div
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            padding: "0rem 1rem",
          }}
        >
          <FaPlus style={{ margin: 4 }} />
          <TextInputButton placeholder="add new..." onEnter={addTodo} />
        </div>
      </div>
    </Card>
  );
};

export default TodoList;
