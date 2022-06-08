import { z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "../prisma";

export const todoRouter = createRouter()
  .query("all", {
    async resolve() {
      return await prisma.task.findMany();
    },
  })
  .mutation("new", {
    input: z.object({
      task: z.string(),
    }),
    async resolve({ input }) {
      const newTask = await prisma.task.create({
        data: {
          task: input.task,
        },
      });
      return newTask;
    },
  })
  .mutation("delete", {
    input: z.string(),
    async resolve({ input }) {
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
