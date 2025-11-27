import React, { useCallback, useEffect, useMemo } from "react";
import initialTodos from "../assets/todos.json";
import { useDailyRandom } from "../hooks/useDailyRandom";
import { FaRotateRight, FaUpload } from "react-icons/fa6";
import Card, { CardComponentProps } from "../components/Card";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "./widgets.css";

const DailyTodo: React.FC<CardComponentProps> = ({ id, close }) => {
  const [todos, setTodos] = useLocalStorage("dailyTodos", initialTodos);

  const [todoIndex, refreshTodo] = useDailyRandom(id, {
    min: 0,
    max: todos.length,
  });

  const todaysTodo = useMemo(() => {
    return todos[todoIndex];
  }, [todoIndex, todos]);

  const handleFileUpload = (file?: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const uploadedTodos = JSON.parse(e.target?.result as string);
        if (!Array.isArray(uploadedTodos)) {
          console.error("Uploaded file is not a valid JSON array");
          alert("Uploaded file is not a valid JSON array");
        }

        setTodos(uploadedTodos);
      } catch (error) {
        console.error("Error parsing uploaded file", error);
        alert("Error parsing uploaded file");
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    if (todos.length === 0) return;
    // unfortunately because useSelect doesn't immediately update
    // i have to ensure refreshTodo doesn't give me the previous last todo
    // which will now be out of bounds after the todo is successfully removed
    // and because i don't want to redesign the entire thing,
    // i'll just put this bandaid on for now
    if (todoIndex >= todos.length) {
      refreshTodo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoIndex, todos]);

  const removeTodo = useCallback(() => {
    const updatedTodos = todos.filter((_, index) => index !== todoIndex);
    setTodos(updatedTodos);
    refreshTodo();
  }, [refreshTodo, setTodos, todoIndex, todos]);

  return (
    <Card
      id={id}
      title="your daily todo"
      close={close}
      buttons={() => (
        <>
          <FaUpload
            title="upload todos (see instructions in about widget)"
            className="click"
            onClick={() => document.getElementById("uploadTodos")?.click()}
          />
          <FaRotateRight
            title="get a new todo (without removing this one from the list)"
            className="click"
            onClick={refreshTodo}
          />
        </>
      )}
      resizeable="nwse"
    >
      <div className="daily-todo" style={{ maxWidth: 1000 }}>
        {todos.length > 0 ? (
          <>
            <input
              type="checkbox"
              checked={false}
              onChange={() => removeTodo()}
              style={{ marginRight: 6, flexShrink: 0 }}
              title="mark this todo as done (and remove it from list)"
            />
            <span
              style={{
                flexGrow: 1,
                marginLeft: 5,
              }}
            >
              {todaysTodo}
            </span>
          </>
        ) : (
          <span>
            <i>no todos left</i>
          </span>
        )}
      </div>

      <input
        id="uploadTodos"
        type="file"
        onChange={(e) => handleFileUpload(e.target.files?.[0])}
        style={{ display: "none" }}
      />
    </Card>
  );
};

export default DailyTodo;
