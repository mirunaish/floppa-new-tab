import React, { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TextInputButton from "../components/TextInputButton";
import { FaPencil, FaPlus, FaX, FaUpDown } from "react-icons/fa6";
import Card, { CardComponentProps } from "../components/Card";
import "./widgets.css";

interface Todo {
  id: string;
  name: string;
  done: boolean;
}

interface TodoItemProps extends Todo {
  setName: (name: string) => void;
  toggleDone: () => void;
  selected?: boolean;
  toggleSelected: (value: boolean) => void;
  removeTodo: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  name,
  setName,
  done,
  toggleDone,
  selected,
  toggleSelected,
  removeTodo,
}) => {
  const [editing, setEditing] = useState(false);
  const selectedRef = React.useRef<HTMLDivElement>(null);

  const submit = useCallback(
    (newName: string) => {
      setName(newName);
      setEditing(false);
    },
    [setName]
  );

  const startEditing = useCallback(() => {
    setEditing(true);
    toggleSelected(false);
  }, [toggleSelected]);

  // if selected, clicking outside will deselect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!selected) return;
      if (
        selectedRef.current &&
        !selectedRef.current.contains(event.target as Node)
      ) {
        toggleSelected(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selected, toggleSelected]);

  return (
    <div ref={selectedRef} className={"todo " + (selected ? "selected" : "")}>
      <input
        type="checkbox"
        checked={done}
        onChange={() => toggleDone()}
        style={{ marginRight: 6, flexShrink: 0 }}
        disabled={editing}
      />

      {!editing ? (
        <div
          style={{
            flexGrow: 1,
            marginLeft: 5,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span
            className={done ? "alt-text" : ""}
            style={{
              textDecoration: done ? "line-through" : "none",
            }}
          >
            {name}
          </span>
          {selected ? (
            <span className="alt-text" style={{ fontSize: "0.8rem" }}>
              press the up or down arrows to move this todo.
            </span>
          ) : null}
        </div>
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
          <FaUpDown
            className={"todo-reorder click " + (selected ? "selected" : "")}
            onClick={() => toggleSelected(!selected)}
            style={{
              marginLeft: 8,
              flexShrink: 0,
            }}
          />

          <FaPencil
            onClick={startEditing}
            className="alt-text click"
            style={{
              marginLeft: 4,
              flexShrink: 0,
            }}
          />

          <FaX
            onClick={() => removeTodo()}
            className="alt-text click"
            style={{
              marginLeft: 8,
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

  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);
  const toggleSelected = useCallback((id: string, value: boolean) => {
    setSelectedTodo(value ? id : null);
  }, []);

  const moveTodo = useCallback(
    (value: number) => {
      if (!selectedTodo) return;

      // get index of selected todo
      const index = todoList.findIndex((t) => t.id === selectedTodo);
      if (index === -1) return; // not selected
      if (index + value < 0 || index + value >= todoList.length) return; // out of bounds

      // swap
      const tdl = [...todoList];
      [tdl[index], tdl[index + value]] = [tdl[index + value], tdl[index]];
      setTodoList(tdl);
    },
    [selectedTodo, setTodoList, todoList]
  );

  // add up and down arrow events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedTodo) return;
      if (event.key === "ArrowUp") {
        moveTodo(-1);
        event.preventDefault(); // prevent scrolling
      } else if (event.key === "ArrowDown") {
        moveTodo(1);
        event.preventDefault();
      }

      // escape or enter key deselects selected todo
      else if (event.key === "Escape" || event.key === "Enter") {
        setSelectedTodo(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedTodo, moveTodo]);

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
            removeTodo={() => removeTodo(todo.id)}
            setName={(name) => editTodo(todo.id, name)}
            toggleDone={() => toggleDone(todo.id)}
            selected={selectedTodo === todo.id}
            toggleSelected={(value) => toggleSelected(todo.id, value)}
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
