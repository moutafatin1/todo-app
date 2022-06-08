import { AppRouter, appRouter } from "@/server/routers/_app";
import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "@/server/context";

// export API handler
export default trpcNext.createNextApiHandler<AppRouter>({
  router: appRouter,
  createContext,
});
