import { createRouter } from "../createRouter";

export const todoRouter = createRouter().query("all", {
  async resolve() {
    return [
      { id: 1, task: "First Task from trpc", isCompleted: false },
      { id: 2, task: "second Task from trpc", isCompleted: true },
      { id: 3, task: "third Task from trpc", isCompleted: false },
      { id: 4, task: "fourth Task from trpc", isCompleted: true },
    ];
  },
});
