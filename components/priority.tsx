import { useQuery } from "react-query";
import LongCoinCard from "./coin-card/long-coin-card";

const fetchCoinsFromSet = async (setName: string) => {
  try {
    let coinsFromSet = await fetch("/api/getCoinsFromSet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ setName: setName }),
    }).then((res) => res.json());
    console.log(coinsFromSet);
    return coinsFromSet;
  } catch (err) {
    console.log(err);
  }
};

const Priority = () => {
  let { data, isLoading, isError } = useQuery("fetchCoinsFromSet", () =>
    fetchCoinsFromSet("priority")
  );

  if (data) {
    console.log(data);
    if (data.submission.length === 0) {
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
          {data.submission.map((item: any, index: any) => (
            <LongCoinCard coin={item.coin} key={`long-${index}`} />
          ))}
        </div>
      );
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return <div>Enter</div>;
};

export default Priority;
