import Card from "./components/Card";
import Quote from "./components/Quote";
import SearchBar from "./components/SearchBar";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Card title="search" initialPosition={{ x: 10, y: 50 }}>
          <SearchBar />
        </Card>
        <Card title="quote" initialPosition={{ x: 50, y: 10 }}>
          <Quote />
        </Card>
        <Card title="todolist" initialPosition={{ x: 50, y: 10 }}>
          <TodoList />
        </Card>
        <Card title="something else" initialPosition={{ x: 50, y: 10 }}>
          maybe i will put something else here
        </Card>
      </div>
    </>
  );
}

export default App;
