import React, { useState, useRef } from "react";
import TodoItem from "./TodoItem";
import { Button } from "./Button";
import { useTasks } from "./TaskContext";

const TodoList: React.FC = () => {
  const { tasks, addTask } = useTasks();
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    addTask(newTask);
    setNewTask("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-center font-bold mb-4 text-2xl">To-Do List</h1>
      <div className="flex flex-col md:flex-row items-center mb-4 gap-2">
        <input
          ref={inputRef}
          className="w-full md:flex-1 border p-2 rounded"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
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

      {/* Container for the task list with background color */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <ul className="space-y-2">
          {tasks.length > 0 ? (
            tasks.map((task) => <TodoItem key={task.id} task={task} />)
          ) : (
            <p className="text-gray-500 text-center">No tasks added yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
