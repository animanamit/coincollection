import { useQuery } from "react-query";
import LongCoinCard from "./coin-card/long-coin-card";

const fetchWishListCoins = async (coinage: string) => {
  try {
    const { watchListCoins } = await fetch("/api/getWishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coinage: coinage }),
    }).then((res) => res.json());

    return watchListCoins;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const Wishlist = ({ coinage }: { coinage: string }) => {
  console.log(coinage);
  const { isLoading, isError, data } = useQuery(
    ["fetchWishListCoins", coinage],
    () => fetchWishListCoins(coinage),
    { refetchOnWindowFocus: false }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center w-full">
        <h1 className="text-3xl font-bold tracking-tight text-center text-gray-900">
          Loading...
        </h1>
      </div>
    );
  }

  if (data) {
    if (data.length === 0) {
      return (
        <div className="flex justify-center w-full">
          <h1 className="text-xl font-normal   text-center text-gray-500">
            No coins found
          </h1>
        </div>
      );
    } else
      return (
        <div className="w-full flex flex-col px-6 space-y-4">
          {Object.entries(data).map(([key, value]) => (
            <LongCoinCard coin={value} key={`long-${key}`} />
          ))}
        </div>
      );
  }

  return <div>Error</div>;
};

export default Wishlist;
