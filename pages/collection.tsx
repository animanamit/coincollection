import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LongCoinCard from "../components/coin-card/long-coin-card";
import { prisma } from "../utils/prisma-client";

import { ViewListIcon, ViewGridIcon } from "@heroicons/react/outline";
import CoinCard from "../components/coin-card/coin-card";

export const getStaticProps: GetStaticProps = async () => {
  const allCoins = await prisma.coin.findMany();
  return { props: { allCoins } };
};

const getAllCoins = async () => {
  let allCoins = await fetch("/api/getAllCoins", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  console.log(allCoins);
  return allCoins;
};

const Collection = ({ allCoins }: { allCoins: any }) => {
  // console.log(allCoins);

  const [view, setView] = useState("grid");

  const { isLoading, isError, isSuccess, data } = useQuery(
    "getAllCoins",
    () => getAllCoins(),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (data) {
      setCoins(data.allCoins);
    }
  }, [data]);

  const [coins, setCoins] = useState<any>(allCoins);

  const filter = async () => {
    let { filteredCoins } = await fetch("/api/getCoinsFromCoinage", {
      method: "GET",
      // body: JSON.stringify({
      //   coinage: "Gupta",
      // }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
    console.log(filteredCoins[0]);
    setCoins(filteredCoins);
  };

  if (data) {
    return (
      <div className="px-12">
        <div className="flex justify-between mx-12 my-4">
          <button onClick={filter}>Filter</button>
          <div className="flex space-x-2">
            <button
              onClick={() => setView("grid")}
              className={` border-[2px] text-gray-500  rounded-lg p-2  ${
                view === "grid" ? "border-gray-500 " : ""
              }`}
            >
              <ViewGridIcon className="h-6 w-6" />
            </button>

            <button
              onClick={() => setView("long")}
              className={`border-[2px] text-gray-500 rounded-lg p-2  ${
                view === "long" ? "border-gray-500 " : ""
              }`}
            >
              <ViewListIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {coins.map((coin: any, index: number) =>
          view === "grid" ? (
            <div className="flex flex-col space-y-4 mb-8">
              {" "}
              <CoinCard coin={coin} key={index} />{" "}
            </div>
          ) : (
            <div className="flex flex-col space-y-4 mb-8">
              <LongCoinCard coin={coin} key={index} />
            </div>
          )
        )}
      </div>
    );
  } else
    return (
      <div className="px-12 py-12">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    );
};

export default Collection;
