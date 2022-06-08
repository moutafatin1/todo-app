import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div className="h-screen">
      <header className="flex justify-end p-5">
        {!session && (
          <button
            onClick={() => signIn("github")}
            className="text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 active:scale-95"
          >
            Sign in
          </button>
        )}
        {session && (
          <>
            <div className="flex flex-col mr-5">
              <p className="text-xl text-white font-bold">
                Welcome {session.user?.name ?? session.user?.email}
              </p>
              <Link href="/tasks" className="">
                <a className="underline text-xl font-bold text-blue-500 hover:text-blue-600 transition-colors">
                  Go to your tasks
                </a>
              </Link>
            </div>
            <button
              onClick={() => signOut()}
              className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 active:scale-95"
            >
              Logout
            </button>
          </>
        )}
      </header>
    </div>
  );
};

export default Home;
