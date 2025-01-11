import { useCallback } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { CardComponentProps } from "./components/Card";
import Quote from "./widgets/Quote";
import SearchBar from "./widgets/SearchBar";
import ThemeSelector from "./widgets/ThemeSelector";
import TodoList from "./widgets/TodoList";
import NewImage from "./widgets/NewImage";
import {
  FaImage,
  FaList,
  FaPalette,
  FaPen,
  FaQuoteRight,
  FaCircleInfo,
} from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import TaskBar from "./components/TaskBar";
import NewNote from "./widgets/NewNote";
import About from "./widgets/About";

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
  newImage: {
    component: (props: CardComponentProps) => (
      <NewImage key={props.id} {...props} />
    ),
    icon: FaImage,
  },
  newNote: {
    component: (props: CardComponentProps) => (
      <NewNote key={props.id} {...props} />
    ),
    icon: FaPen,
  },
  about: {
    component: (props: CardComponentProps) => (
      <About key={props.id} {...props} />
    ),
    icon: FaCircleInfo,
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
      newImage: false,
      newNote: false,
      about: false,
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
          .filter(
            ([id]) =>
              visible[id] ||
              id == "newImage" ||
              id == "newNote" ||
              id == "themeSelector"
          )
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
