import { useRouter } from "next/router";
import { useQuery } from "react-query";
import LongCoinCard from "../../components/coin-card/long-coin-card";

const fetchCoinsFromCoinage = async (coinageName: string) => {
  const { filteredCoins } = await fetch("/api/getCoinsFromCoinage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ coinageName: coinageName }),
  }).then((res) => res.json());

  let arr = [Object.values(filteredCoins)];
  return filteredCoins;
};

const Coinage = () => {
  const router = useRouter();
  let { name } = router.query;
  const { isLoading, isError, isSuccess, data } = useQuery(
    ["fetchCoinsFromCoinage", name],
    () => fetchCoinsFromCoinage(name as string),
    { refetchOnWindowFocus: false }
  );

  if (isLoading) {
    <div className="px-8 py-4">
      <h1 className="text-4xl font-bold tracking-tight text-center">
        Loading...
      </h1>
    </div>;
  }

  if (data) {
    if (data.length === 0) {
      return (
        <div className="px-8 py-4">
          <h1 className="text-4xl font-bold tracking-tight text-center">
            {name}
          </h1>
          <h1 className="text-lg mt-8 font-medium text-gray-700  text-center">
            No coins found.
          </h1>
        </div>
      );
    }

    return (
      <div className="px-8 py-4">
        <h1 className="text-4xl font-bold tracking-tight text-center">
          {name}
        </h1>

        <div className="w-full">
          {Object.entries(data).map(([key, value]) => (
            <LongCoinCard coin={value} key={key} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-4">
      <h1 className="text-2xl font-bold tracking-tight text-center">
        An error has occurred, please reload this page.
      </h1>
    </div>
  );
};

export default Coinage;
