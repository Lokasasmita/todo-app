import React from "react";
import TodoList from "./components/TodoList";
import { TaskProvider } from "./components/TaskContext";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <TodoList />
    </TaskProvider>
  );
};

export default App;
