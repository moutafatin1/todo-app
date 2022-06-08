import { z } from "zod";
import { createRouter } from "../createRouter";
import { todoRouter } from "./todo";

export const appRouter = createRouter().merge("todo.", todoRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
