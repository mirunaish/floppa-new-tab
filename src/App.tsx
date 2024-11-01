import { useCallback } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { CardComponentProps } from "./components/Card";
import Quote from "./components/Quote";
import SearchBar from "./components/SearchBar";
import ThemeSelector from "./components/ThemeSelector";
import TodoList from "./components/TodoList";
import { FaList, FaPalette, FaQuoteRight } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import TaskBar from "./components/TaskBar";

const WIDGETS: Record<
  string,
  { component: React.FC<CardComponentProps>; icon: React.FC }
> = {
  searchBar: {
    component: (props: CardComponentProps) => (
      <SearchBar key={props.id} {...props} />
    ),
    icon: FaSearch,
  },
  todoList: {
    component: (props: CardComponentProps) => (
      <TodoList key={props.id} {...props} />
    ),
    icon: FaList,
  },
  quote: {
    component: (props: CardComponentProps) => (
      <Quote key={props.id} {...props} />
    ),
    icon: FaQuoteRight,
  },
  themeSelector: {
    component: (props: CardComponentProps) => (
      <ThemeSelector key={props.id} {...props} />
    ),
    icon: FaPalette,
  },
};

function App() {
  const [visible, setVisible] = useLocalStorage<Record<string, boolean>>(
    "widgets-visible",
    {
      searchBar: true,
      todoList: true,
      quote: true,
      themeSelector: false,
    }
  );
  const toggleVisible = useCallback(
    (id: string) => {
      setVisible({ ...visible, [id]: !visible[id] });
    },
    [setVisible, visible]
  );

  return (
    <>
      <div>
        {Object.entries(WIDGETS)
          .filter(([id]) => visible[id])
          .map(([id, { component }]) =>
            component({ id, close: toggleVisible, visible: visible[id] })
          )}

        <TaskBar
          widgets={Object.entries(WIDGETS)
            .filter(([id]) => !visible[id])
            .map(([id, { icon }]) => ({ id, icon }))}
          open={toggleVisible}
        />
      </div>
    </>
  );
}

export default App;
