import { useCallback } from "react";
import {
  FaImage,
  FaList,
  FaPalette,
  FaPen,
  FaQuoteRight,
  FaCircleInfo,
  FaBook,
  FaSquareCheck,
} from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { GiRingedPlanet } from "react-icons/gi";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { CardComponentProps } from "./components/Card";
import Quote from "./widgets/Quote";
import SearchBar from "./widgets/SearchBar";
import ThemeSelector from "./widgets/ThemeSelector";
import TodoList from "./widgets/TodoList";
import NewImage from "./widgets/NewImage";
import TaskBar from "./components/TaskBar";
import NewNote from "./widgets/NewNote";
import About from "./widgets/About";
import RSSFeed from "./widgets/RSSFeed";
import DailyTodo from "./widgets/DailyTodo";

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
  dailyTodo: {
    component: (props: CardComponentProps) => (
      <DailyTodo key={props.id} {...props} />
    ),
    icon: FaSquareCheck,
  },
  quote: {
    component: (props: CardComponentProps) => (
      <Quote key={props.id} {...props} />
    ),
    icon: FaQuoteRight,
  },
  wordOfTheDay: {
    component: (props: CardComponentProps) => (
      <RSSFeed
        key={props.id}
        {...props}
        url="https://www.merriam-webster.com/wotd/feed/rss2"
        title="word of the day"
      />
    ),
    icon: FaBook,
  },
  astronomyPicture: {
    component: (props: CardComponentProps) => (
      <RSSFeed
        key={props.id}
        {...props}
        url="https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss"
        title="nasa picture of the day"
      />
    ),
    icon: GiRingedPlanet,
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
  themeSelector: {
    component: (props: CardComponentProps) => (
      <ThemeSelector key={props.id} {...props} />
    ),
    icon: FaPalette,
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
      dailyTodo: false,
      quote: true,
      wordOfTheDay: false,
      astronomyPicture: false,
      newImage: false,
      newNote: false,
      themeSelector: false,
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
          widgets={Object.entries(WIDGETS).map(([id, { icon }]) => ({
            id,
            icon,
            visible: visible[id],
          }))}
          open={toggleVisible}
        />
      </div>
    </>
  );
}

export default App;
