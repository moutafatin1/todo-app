import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Context } from "../context";
import { createRouter } from "../createRouter";
import { prisma } from "../prisma";

const getUserIdOrThrow = async (ctx: Context) => {
  const id = ctx.session?.user?.id;
  console.log("🚀 ~ file: todo.ts ~ line 9 ~ getUserIdOrThrow ~ id", id);
  if (!id) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }

  return id;
};

export const todoRouter = createRouter()
  .query("all", {
    async resolve({ ctx }) {
      const userId = await getUserIdOrThrow(ctx);

      return await prisma.task.findMany({
        where: {
          userId,
        },
      });
    },
  })
  .mutation("new", {
    input: z.object({
      task: z.string(),
    }),
    async resolve({ input, ctx }) {
      const userId = await getUserIdOrThrow(ctx);

      const newTask = await prisma.task.create({
        data: {
          task: input.task,
          userId,
        },
      });
      return newTask;
    },
  })
  .mutation("delete", {
    input: z.string(),
    async resolve({ input, ctx }) {
      const userId = await getUserIdOrThrow(ctx);
      await prisma.task.delete({
        where: {
          id: input,
        },
      });
    },
  })
  .mutation("updateCompleted", {
    input: z.object({
      id: z.string(),
      isCompleted: z.boolean(),
    }),
    async resolve({ input }) {
      await prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          isCompleted: !input.isCompleted,
        },
      });
    },
  });
