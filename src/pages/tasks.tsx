/* eslint-disable @next/next/no-img-element */
import { Task } from "@/components";
import { createContext } from "@/server/context";
import { appRouter } from "@/server/routers/_app";
import { trpc } from "@/utils/trpc";
import { createSSGHelpers } from "@trpc/react/ssg";
import type { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useState } from "react";

type TasksPageProps = {
  session: Session;
};

const Tasks = ({ session }: TasksPageProps) => {
  const [task, setTask] = useState("");
  const utils = trpc.useContext();
  const { data: todos, isLoading, ...restData } = trpc.useQuery(["todo.all"]);
  console.log("🚀 ~ file: tasks.tsx ~ line 17 ~ Tasks ~ restData", restData);
  const addNewTask = trpc.useMutation("todo.new", {
    async onSuccess() {
      await utils.invalidateQueries("todo.all");
    },
  });
  const deleteTaskMutation = trpc.useMutation("todo.delete", {
    async onSuccess() {
      await utils.invalidateQueries("todo.all");
    },
  });
  const updateCompletedMutation = trpc.useMutation("todo.updateCompleted", {
    async onSuccess() {
      await utils.invalidateQueries("todo.all");
    },
  });
  const newTask = () => {
    addNewTask.mutate({ task });
    setTask("");
  };

  const deleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  const updateCompleted = (id: string, isCompleted: boolean) => {
    updateCompletedMutation.mutate({ id, isCompleted });
  };
  if (isLoading) return <div>Is Loading...</div>;
  return (
    <div className="h-screen flex flex-col items-center justify-center text-2xl text-center text-white font-bold">
      <div>
        <ul className="space-y-3">
          {todos?.map((todo) => (
            <div key={todo.id} className="flex items-center relative ">
              <Task todo={todo} updateCompleted={updateCompleted} />
              <img
                onClick={() => deleteTask(todo.id)}
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
          <button
            onClick={newTask}
            className="absolute px-4 py-2 right-0 bottom-0 top-0  bg-green-600 rounded-lg hover:bg-green-700 active:scale-95"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return {
    props: { session },
  };
};
