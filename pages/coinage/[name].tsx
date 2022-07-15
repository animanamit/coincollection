import { Popover } from "@headlessui/react";
import {
  BookOpenIcon,
  ViewGridIcon,
  ViewListIcon,
  ClipboardListIcon,
  SearchIcon,
  AdjustmentsIcon,
  MenuAlt4Icon,
  ViewBoardsIcon,
  TableIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import CoinCard from "../../components/coin-card/coin-card";
import LongCoinCard from "../../components/coin-card/long-coin-card";
import Wishlist from "../../components/wishlist";

import { usePopper } from "react-popper";
import Priority from "../../components/priority";

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

    let coinObjs = Object.values(filteredCoins);

    coinObjs.sort((a: any, b: any) =>
      a.sequenceNumber.localeCompare(b.sequenceNumber, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );

    let rulersArr: string[] = [];

    if (coinageName === "Assam" || coinageName === "Gupta") {
      const { rulers } = await fetch("/api/getRulersFromCoinage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coinageName: coinageName }),
      }).then((res) => res.json());

      rulers.sort((a: any, b: any) =>
        a.sequenceNumber.localeCompare(b.sequenceNumber, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );

      // TODO: add sorting for non Gupta coins, discard first 2 digits of sequenceNumber

      rulers.forEach((ruler: any) => {
        if (rulersArr.indexOf(ruler.ruler) === -1) {
          rulersArr.push(ruler.ruler);
        }
      });
    }

    return { coinObjs, rulersArr };
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

  const [coinsToDisplay, setCoinsToDisplay] = useState([]);

  const filters = useRef(new Map());

  const rulers = useRef([]);

  const displayCoinsWithFilters = async (
    label: string,
    filter: string,
    action: string
  ) => {
    let currFilters = filters.current;
    if (action === "add") currFilters.set(label, filter);
    if (action === "remove") currFilters.delete(label);

    let vals = Array.from(currFilters.values());
    // console.log(vals);

    if (vals.length === 0) {
      const { filteredCoins } = await fetch("/api/getCoinsFromCoinage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coinageName: name }),
      }).then((res) => res.json());

      let orderedFilteredCoins = [];

      let coinObjs = Object.values(filteredCoins);

      coinObjs.sort((a: any, b: any) =>
        a.sequenceNumber.localeCompare(b.sequenceNumber, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );
      setCoinsToDisplay(coinObjs as any);
    } else {
      let { coinsViaFilters } = await fetch("/api/getCoinsWithFilters", {
        method: "POST",
        body: JSON.stringify({ filters: vals }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setCoinsToDisplay(coinsViaFilters);
    }

    filters.current = currFilters;
  };

  // const addFilter = (filter: string, label: string) => {
  //   filters.current.set(label, filter);
  //   displayCoinsWithFilters(label, filter);
  // };

  // const removeFilter = (filter: string, label: string) => {
  //   filters.current.delete(label);
  //   console.log(filters.current);
  //   displayCoinsWithFilters();
  // };

  const filterHandler = (filter: string, label: string) => {
    if (filters.current.has(label)) {
      displayCoinsWithFilters(filter, label, "remove");
    } else {
      displayCoinsWithFilters(label, filter, "add");
    }
  };

  useEffect(() => {
    if (data) {
      setCoinsToDisplay((data as any).coinObjs);
      rulers.current = (data as any).rulersArr;
    }
  }, [data]);

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
            {!!coinsToDisplay &&
              coinsToDisplay.map((item: any, index: any) => (
                <LongCoinCard coin={item} key={`long-${index}`} />
              ))}
          </div>
        );
        break;
      case "grid":
        view = (
          <div className="w-fit px-8 py-4 overflow-y-scroll grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {!!coinsToDisplay &&
              coinsToDisplay.map((item: any, index: any) => (
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
            {
              // TODO: only show waitlist coins from selected coinage
            }
          </div>
        );
        break;
      case "sets":
        view = (
          <div className="flex flex-col justify-center w-full">
            <Priority />
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
          <div>
            <div className="fixed bg-white rounded-lg h-1/2 flex flex-col  space-y-6 my-4 ">
              <button
                onClick={() => setToggleView("history")}
                className="text-gray-400 w-6 h-6   hover:scale-110  rounded-md transition-transform ease-out duration-120 flex justify-center items-center"
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
                <ViewBoardsIcon className="rotate-90" />
              </button>
              <button className="text-gray-400 w-6 h-6 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center">
                <TableIcon />
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

              <button
                onClick={() => setToggleView("sets")}
                className="text-gray-400 w-6 h-6 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center"
              >
                <StarIcon />
              </button>

              {/* <button className="text-gray-400 w-6 h-6 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center"></button> */}
            </div>
          </div>
          <div className="flex flex-1 justify-center">
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
        {(name === "Gupta" || name === "Assam") && (
          <div className=" z-20 backdrop-filter backdrop-blur-lg bg-opacity-30  border-t-[1px] border-gray-200 sticky bottom-0 h-20 flex items-center bg-white overflow-x-scroll space-x-2 px-2">
            {!!rulers.current &&
              rulers.current.map((item: string, index: number) => (
                <div
                  key={index}
                  onClick={() => filterHandler(item, item)}
                  className={`${
                    filters.current.has(item) ? "bg-red-400" : "bg-yellow-400 "
                  } px-2 py-1 rounded-full w-fit flex justify-center items-center cursor-pointer`}
                >
                  <span
                    className={`${
                      filters.current.has(item)
                        ? "text-red-700"
                        : "text-yellow-700"
                    } whitespace-nowrap text-xs font-semibold`}
                  >
                    {item}
                  </span>
                </div>
              ))}
          </div>
        )}
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
