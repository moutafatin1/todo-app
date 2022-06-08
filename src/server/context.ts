import * as trpcNext from "@trpc/server/adapters/next";
import * as trpc from "@trpc/server";
import { getSession } from "next-auth/react";

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = await getSession({ req });
  console.log("createContext for", session?.user?.name ?? "unknown user");
  return {
    req,
    res,
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
