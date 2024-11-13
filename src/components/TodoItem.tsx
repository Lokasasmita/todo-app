import React, { useState } from "react";
import { Button } from "./Button";

interface Task {
  id: number;
  title: string;
  isEditing: boolean;
}

interface TodoItemProps {
  task: Task;
  title: string;
  onDelete: () => void;
  onEdit: (title: string) => void;
  toggleEdit: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  title,
  onDelete,
  onEdit,
  toggleEdit,
}) => {
  const [editTitle, setEditTitle] = useState(task.title);
  console.log(title);

  const handleSave = () => {
    onEdit(editTitle); // Call onEdit with the updated title
  };

  return (
    <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 border-b">
      {task.isEditing ? (
        <>
          <input
            className="flex-1 border p-2 rounded w-full sm:w-auto"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <Button
            className="w-full sm:w-auto mt-2 sm:mt-0 ml-0 sm:ml-2"
            onClick={handleSave}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          {/* Ensure text wraps if it’s too long */}
          <span className="flex-1 break-words whitespace-normal">
            {task.title}
          </span>
          <div className="flex gap-2 mt-2 sm:mt-0">
            {/* Flex with gap to ensure buttons are horizontally aligned with spacing */}
            <Button onClick={toggleEdit}>Edit</Button>
            <Button onClick={onDelete}>Delete</Button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
