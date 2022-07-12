import { Popover } from "@headlessui/react";
import {
  BookOpenIcon,
  ViewGridIcon,
  ViewListIcon,
  ClipboardListIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import CoinCard from "../../components/coin-card/coin-card";
import LongCoinCard from "../../components/coin-card/long-coin-card";
import Wishlist from "../../components/wishlist";

import { usePopper } from "react-popper";

const fetchCoinsFromCoinage = async (coinageName: string) => {
  try {
    const { filteredCoins } = await fetch("/api/getCoinsFromCoinage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coinageName: coinageName }),
    }).then((res) => res.json());

    let orderedFilteredCoins = [];

    let objs = Object.values(filteredCoins);

    objs.sort((a: any, b: any) =>
      a.sequenceNumber.localeCompare(b.sequenceNumber, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );

    console.log(objs);

    return objs;
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
    if ((data as any).length === 0) {
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
          <div className="w-full flex flex-col px-6 space-y-4">
            {/* {Object.entries(data).map(([key, value]) => (
              <LongCoinCard coin={value} key={`long-${key}`} />
            ))} */}
            {(data as any).map((item: any, index: any) => (
              <LongCoinCard coin={item} key={`long-${index}`} />
            ))}
          </div>
        );
        break;
      case "grid":
        view = (
          <div className="w-full p-2 overflow-y-scroll grid grid-cols-2">
            {/* {Object.entries(data).map(([key, value]) => (
              <CoinCard coin={value} key={key} />
            ))} */}
            {(data as any).map((item: any, index: any) => (
              <CoinCard coin={item} key={`long-${index}`} />
            ))}
          </div>
        );
        break;
      case "history":
        view = (
          <div className="flex justify-center w-full py-4">
            <h1 className="text-xl font-bold tracking-tight  text-center">
              History
            </h1>
          </div>
        );
        break;
      case "wishlist":
        view = (
          <div className="flex flex-col justify-center w-full">
            <Wishlist coinage={name as string} />
          </div>
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
        <div className="flex h-full">
          <div className=" bg-white rounded-lg h-1/2 flex flex-col  space-y-6 my-4 ">
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
            <button className="text-gray-400 w-6 h-6 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center">
              <SearchIcon />
            </button>

            <button className="text-gray-400 w-6 h-6 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center">
              <AdjustmentsIcon />
            </button>

            {/* <button className="text-gray-400 w-6 h-6 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center"></button> */}
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
