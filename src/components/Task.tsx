import React from "react";

type TaskProps = {
  todo: { id: number; task: string; isCompleted: boolean };
};
export const Task = ({ todo }: TaskProps) => {
  return (
    <li
      className={`p-2 border-4 rounded-lg bg-purple-500 w-full cursor-pointer ${
        todo.isCompleted ? "isCompleted" : ""
      }`}
    >
      {todo.task}
    </li>
  );
};
