import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LongCoinCard from "../components/coin-card/long-coin-card";
import { prisma } from "../utils/prisma-client";

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
  return (
    <div className="px-12">
      <div>
        <button onClick={filter}>Filter</button>
      </div>
      <div className="flex flex-col space-y-4 mb-8">
        {coins.map((coin: any, index: number) => (
          <LongCoinCard coin={coin} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
