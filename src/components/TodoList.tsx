import React, { useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TextInput from "./TextInput";

interface Todo {
  id: string;
  name: string;
  done: boolean;
}

interface TodoItemProps extends Todo {
  removeTodo: (id: string) => void;
  toggleDone: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  name,
  done,
  toggleDone,
  removeTodo,
}) => {
  return (
    <div>
      <input type="checkbox" checked={done} onChange={() => toggleDone(id)} />
      <span
        key={id}
        style={{
          marginLeft: 5,
          color: done ? "gray" : "black",
          textDecoration: done ? "line-through" : "none",
        }}
      >
        {name}
      </span>
      <span
        onClick={() => removeTodo(id)}
        style={{
          float: "right",
          cursor: "pointer",
          marginLeft: 10,
          color: "gray",
        }}
      >
        x
      </span>
    </div>
  );
};

const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useLocalStorage<Todo[]>("todoList", []);

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
    <div style={{ display: "flex", flexDirection: "column" }}>
      {todoList.map((todo) => (
        <TodoItem {...todo} removeTodo={removeTodo} toggleDone={toggleDone} />
      ))}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          gap: 5,
        }}
      >
        <span style={{ margin: 4 }}> + </span>
        <TextInput placeholder="add new..." onEnter={addTodo} />
      </div>
    </div>
  );
};

export default TodoList;
