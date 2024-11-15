import React, { createContext, useContext, ReactNode } from "react";
import useLocalStorageState from "./useLocalStorageState";

interface Task {
  id: number;
  title: string;
  isEditing: boolean;
}

interface TaskContextProps {
  tasks: Task[];
  addTask: (title: string) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
  toggleEdit: (id: number) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useLocalStorageState<Task[]>("tasks", []);

  const addTask = (title: string) => {
    setTasks([...tasks, { id: Date.now(), title, isEditing: false }]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number, title: string) => {
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
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, editTask, toggleEdit }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the TaskContext
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
