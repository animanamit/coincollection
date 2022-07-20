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

const fetchCoinsFromCoinage = async (
  coinageName: string,
  filters: any,
  status: any
) => {
  // let vals = Array.from(filters.values());
  // console.log(vals);

  try {
    const { filteredCoins } = await fetch("/api/getCoinsFromCoinage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coinageName: coinageName,
        filters: filters,
        status: status,
      }),
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

    if (coinageName === "Gupta") {
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
  // const filters = useRef(new Map());
  const [filters, setFilters] = useState(new Map());
  const [status, setStatus] = useState("owned");
  const [coinLayout, setCoinLayout] = useState("grid");

  const router = useRouter();
  let { name } = router.query;
  const { isLoading, isError, data } = useQuery(
    ["fetchCoinsFromCoinage", name, Array.from(filters.values()), status],
    () =>
      fetchCoinsFromCoinage(
        name as string,
        Array.from(filters.values()) as any,
        status
      ),
    { refetchOnWindowFocus: false }
  );

  const [toggleView, setToggleView] = useState("grid");

  const [coinsToDisplay, setCoinsToDisplay] = useState([]);

  const rulers = useRef([]);

  // const displayCoinsWithFilters = (
  //   label: string,
  //   filter: string,
  //   action: string
  // ) => {
  //   let currFilters = new Map(filters);
  //   if (action === "add") currFilters.set(label, filter);
  //   if (action === "remove") currFilters.delete(label);
  //   console.log(currFilters);
  //   setFilters((filters) => currFilters);
  // };

  const filterHandler = (filter: string, label: string) => {
    console.log("inside filter handler");
    let currFilters = new Map(filters);
    if (filters.has(label)) {
      // console.log("removing label");
      currFilters.delete(label);

      // displayCoinsWithFilters(filter, label, "remove");
    } else {
      currFilters.set(label, filter);
      // displayCoinsWithFilters(label, filter, "add");
    }
    console.log(currFilters);
    setFilters((filters) => currFilters);
  };

  useEffect(() => {
    if (data) {
      console.log("new data has arrived");
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
    let view;

    // switch (toggleView) {
    //   case "list":
    //     view = (
    //       <div className="w-full flex flex-col px-6 space-y-4">
    //         {!!data &&
    //           (data as any).coinObjs.map((item: any, index: any) => (
    //             <LongCoinCard coin={item} key={`long-${index}`} />
    //           ))}
    //       </div>
    //     );
    //     break;
    //   case "grid":
    //     view = (
    //       <div className="w-fit px-8 py-4 overflow-y-scroll grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    //         {!!data &&
    //           (data as any).coinObjs.map((item: any, index: any) => (
    //             <CoinCard coin={item} key={`long-${index}`} />
    //           ))}
    //       </div>
    //     );
    //     break;
    //   case "history":
    //     view = (
    //       <div className="flex justify-center w-full py-4">
    //         <h1 className="text-xl font-bold tracking-tight  text-center">
    //           History
    //         </h1>
    //       </div>
    //     );
    //     break;
    //   case "wishlist":
    //     view = (
    //       <div className="flex flex-col justify-center w-full">
    //         <Wishlist coinage={name as string} />
    //       </div>
    //     );
    //     break;
    //   case "sets":
    //     view = (
    //       <div className="flex flex-col justify-center w-full">
    //         <Priority />
    //       </div>
    //     );
    //     break;
    //   default:
    //     break;
    // }

    return (
      <div className="h-full">
        <div className="fixed z-10 bg-white w-full">
          <div className="h-20 flex justify-center items-center w-full border-b-[1px] border-gray-200 ">
            <h1 className="text-3xl font-bold tracking-tight text-center">
              {name}
            </h1>
          </div>

          {name === "Gupta" && (
            <div className=" border-gray-200 border-b-[1px]  h-16 flex items-center bg-white overflow-x-scroll space-x-2 px-2">
              {!!rulers.current &&
                rulers.current.map((item: string, index: number) => (
                  <div
                    key={index}
                    onClick={() => filterHandler(item, item)}
                    className={`${
                      filters.has(item) ? "bg-red-400" : "bg-yellow-400 "
                    } px-2 py-1 rounded-full w-fit flex justify-center items-center cursor-pointer`}
                  >
                    <span
                      className={`${
                        filters.has(item) ? "text-red-700" : "text-yellow-700"
                      } whitespace-nowrap text-xs font-semibold`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
            </div>
          )}
          <div className="h-10 flex justify-end border-b-[1px] border-gray-200 space-x-4 px-4 items-center">
            <button
              onClick={() => setToggleView("history")}
              className="text-gray-400 w-5 h-5   hover:scale-110  rounded-md transition-transform ease-out duration-120 flex justify-center items-center"
            >
              <BookOpenIcon className="" />
            </button>
            <button
              onClick={() => setToggleView("grid")}
              className="text-gray-400 w-5 h-5 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center"
            >
              <ViewGridIcon />
            </button>
            <button
              onClick={() => setToggleView("list")}
              className="text-gray-400 w-5 h-5 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center"
            >
              <ViewBoardsIcon className="rotate-90" />
            </button>
            <button className="text-gray-400 w-5 h-5 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center">
              <TableIcon />
            </button>
            <button
              onClick={() => setToggleView("wishlist")}
              className="text-gray-400 w-5 h-5 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center"
            >
              <ClipboardListIcon />
            </button>
            <button className="text-gray-400 w-5 h-5 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center">
              <SearchIcon />
            </button>

            <button className="text-gray-400 w-5 h-5 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center">
              <AdjustmentsIcon />
            </button>

            <button
              onClick={() => setToggleView("sets")}
              className="text-gray-400 w-5 h-5 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center"
            >
              <StarIcon />
            </button>
          </div>
        </div>
        <div className="w-full h-1/2 overflow-y-scroll flex flex-col px-6 mt-4 space-y-4">
          {!!data &&
            (data as any).coinObjs.map((item: any, index: any) => (
              <LongCoinCard coin={item} key={`long-${index}`} />
            ))}
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
