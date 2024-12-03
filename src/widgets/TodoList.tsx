import React, { useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TextInputButton from "../components/TextInputButton";
import { FaPlus, FaX } from "react-icons/fa6";
import Card, { CardComponentProps } from "../components/Card";

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
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>
        <input type="checkbox" checked={done} onChange={() => toggleDone(id)} />
      </span>
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

      <span
        onClick={() => removeTodo(id)}
        className="alt-text"
        style={{
          cursor: "pointer",
          marginLeft: 10,
        }}
      >
        <FaX />
      </span>
    </div>
  );
};

const TodoList: React.FC<CardComponentProps> = ({ id, close }) => {
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
    <Card id={id} title="todo list" close={close} resizeable="nwse">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        {todoList.map((todo) => (
          <TodoItem
            {...todo}
            key={todo.id}
            removeTodo={removeTodo}
            toggleDone={toggleDone}
          />
        ))}
        <div
          style={{
            marginTop: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
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
