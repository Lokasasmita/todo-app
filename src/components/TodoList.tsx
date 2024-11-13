import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { Button } from "./Button";
import useLocalStorageState from "./useLocalStorageState"; // Import custom hook

interface Task {
  id: number;
  title: string;
  isEditing: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useLocalStorageState<Task[]>("tasks", []);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), title: newTask, isEditing: false }]);
    setNewTask("");
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: number, title: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title, isEditing: false } : task
      )
    );
  };

  const toggleEdit = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-md shadow-md">
      <div className="flex flex-col md:flex-row items-center mb-4 gap-2">
        <input
          className="w-full md:flex-1 border p-2 rounded"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <Button
          variant="default"
          className="w-full md:w-auto ml-0 md:ml-4"
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            title={task.title}
            onDelete={() => handleDeleteTask(task.id)}
            onEdit={(title) => handleEditTask(task.id, title)}
            toggleEdit={() => toggleEdit(task.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
