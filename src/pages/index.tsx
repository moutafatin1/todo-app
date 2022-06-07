import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data } = trpc.useQuery(["hello", { text: "Oussama" }]);
  return (
    <div className="text-5xl text-center text-green-600 font-bold">
      {data?.greeting}
    </div>
  );
};

export default Home;
