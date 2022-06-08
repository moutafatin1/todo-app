import React from "react";

type TaskProps = {
  todo: { id: string; task: string; isCompleted: boolean };
  updateCompleted: (id: string, isCompleted: boolean) => void;
};
export const Task = ({ todo, updateCompleted }: TaskProps) => {
  return (
    <li
      onClick={() => updateCompleted(todo.id, todo.isCompleted)}
      className={`p-2 border-4 rounded-lg bg-purple-500 w-full cursor-pointer ${
        todo.isCompleted ? "isCompleted" : ""
      }`}
    >
      {todo.task}
    </li>
  );
};
