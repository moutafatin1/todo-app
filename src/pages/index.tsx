/* eslint-disable @next/next/no-img-element */
import { Task } from "@/components";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [task, setTask] = useState("");
  const { data: todos, isLoading } = trpc.useQuery(["todo.all"]);
  if (isLoading) return <div>Is Loading...</div>;
  return (
    <div className="h-screen flex flex-col items-center justify-center text-2xl text-center text-white font-bold">
      <div>
        <ul className="space-y-3">
          {todos?.map((todo) => (
            <div key={todo.id} className="flex items-center relative ">
              <Task todo={todo}/>
              <img
                src="https://img.icons8.com/plasticine/100/undefined/filled-trash.png"
                alt="delete icon"
                className="cursor-pointer hover:opacity-70 active:scale-95 w-16 h-16"
              />
            </div>
          ))}
        </ul>
        <div className="relative  mt-5 w-full">
          <input
            type="text"
            className="  rounded-lg w-full  p-2 text-gray-700 focus:outline-purple-700"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="absolute px-4 py-2 right-0 bottom-0 top-0  bg-green-600 rounded-lg hover:bg-green-700 active:scale-95">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
