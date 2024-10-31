import Card from "./components/Card";
import Quote from "./components/Quote";
import SearchBar from "./components/SearchBar";
import TodoList from "./components/TodoList";
import { Images } from "./utils/consts";

function App() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Card title="search" initialPosition={{ x: 10, y: 50 }}>
          <SearchBar />
        </Card>

        <Quote />

        <Card title="todolist" initialPosition={{ x: 50, y: 10 }}>
          <TodoList />
        </Card>

        {Object.entries(Images).map(([name, url], i) => (
          <Card
            key={name}
            title={name}
            initialPosition={{ x: i * 50, y: 10 }}
            padding={false}
          >
            <img src={url} style={{ width: 300, height: "auto" }} />
          </Card>
        ))}
      </div>
    </>
  );
}

export default App;
