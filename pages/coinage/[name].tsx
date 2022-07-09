import {
  BookOpenIcon,
  ViewGridIcon,
  ViewListIcon,
  ClipboardListIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import CoinCard from "../../components/coin-card/coin-card";
import LongCoinCard from "../../components/coin-card/long-coin-card";

const fetchCoinsFromCoinage = async (coinageName: string) => {
  try {
    const { filteredCoins } = await fetch("/api/getCoinsFromCoinage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coinageName: coinageName }),
    }).then((res) => res.json());
    return filteredCoins;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const Coinage = () => {
  const router = useRouter();
  let { name } = router.query;
  const { isLoading, isError, isSuccess, data } = useQuery(
    ["fetchCoinsFromCoinage", name],
    () => fetchCoinsFromCoinage(name as string),
    { refetchOnWindowFocus: false }
  );

  const [toggleView, setToggleView] = useState("grid");

  if (isError) {
    <div className="px-8 py-4">
      <h1 className="text-2xl font-bold tracking-tight text-center">
        An error has occurred, please reload this page.
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

    let view;

    switch (toggleView) {
      case "list":
        view = (
          <div className="w-full p-4 flex flex-col space-y-4">
            {Object.entries(data).map(([key, value]) => (
              <LongCoinCard coin={value} key={key} />
            ))}
          </div>
        );
        break;
      case "grid":
        view = (
          <div className="w-full p-4">
            {Object.entries(data).map(([key, value]) => (
              <CoinCard coin={value} key={key} />
            ))}
          </div>
        );
        break;
      case "history":
        view = (
          <h1 className="text-xl font-bold tracking-tight text-center">
            History
          </h1>
        );
        break;
      case "wishlist":
        view = (
          <h1 className="text-xl font-bold tracking-tight text-center">
            Wishlist
          </h1>
        );
        break;
      default:
        break;
    }

    return (
      <div className="px-8 py-4 h-full">
        <h1 className="text-4xl font-bold tracking-tight text-center">
          {name}
        </h1>
        <div className="flex">
          <div className=" bg-white rounded-lg h-1/2 flex flex-col px-4 space-y-6 ">
            <button
              onClick={() => setToggleView("history")}
              className="text-gray-400 w-6 h-6 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center"
            >
              <BookOpenIcon className="" />
            </button>
            <button
              onClick={() => setToggleView("grid")}
              className="text-gray-400 w-6 h-6 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center"
            >
              <ViewGridIcon />
            </button>
            <button
              onClick={() => setToggleView("list")}
              className="text-gray-400 w-6 h-6 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center"
            >
              <ViewListIcon />
            </button>
            <button
              onClick={() => setToggleView("wishlist")}
              className="text-gray-400 w-6 h-6 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center"
            >
              <ClipboardListIcon />
            </button>
          </div>
          {
            // <div className="w-full p-4 grid">
            //   {Object.entries(data).map(([key, value]) =>
            //     toggleView ? (
            //       <LongCoinCard coin={value} key={key} />
            //     ) : (
            //       <CoinCard coin={value} key={key} />
            //     )
            //   )}
            // </div>
            view
          }
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-4">
      <h1 className="text-4xl font-bold tracking-tight text-center">
        Loading...
      </h1>
    </div>
  );
};

export default Coinage;
