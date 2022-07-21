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
import {
  SearchIcon as SolidSearchIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
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
  console.log(status);

  try {
    const { filteredCoins } = await fetch("/api/getCoinsFromCoinage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coinageName: coinageName,
        filters: filters,
        ...(status !== "" && { status: status }),
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

  const [showSelection, setShowSelection] = useState("");

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
      currFilters.delete(label);
    } else {
      currFilters.set(label, filter);
    }
    console.log(currFilters);
    setFilters((filters) => currFilters);
  };

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
        <div className=" bg-white w-full">
          <div className="h-20 flex justify-center items-center w-full border-b-[1px] border-gray-200 ">
            <h1 className="text-3xl font-bold tracking-tight text-center">
              {name}
            </h1>
          </div>
          <div className="bg-slate-50 border-t-[1px] border-b-[1px] border-slate-300 h-10 px-2 py-1 flex items-center justify-center">
            <input
              placeholder="Search for..."
              className="w-full px-4 py-2 bg-slate-50 text-xs"
            />
            <SolidSearchIcon className="h-4 w-4 ml-2 text-slate-500" />
          </div>
          <div className="h-12 bg-white flex justify-evenly items-center px-4  py-2 border-b-[1px] border-gray-300">
            <div>
              <button className="text-slate-500 w-4 h-4   hover:scale-110  rounded-md transition-transform ease-out duration-120 flex justify-center items-center">
                <BookOpenIcon className="" />
              </button>
            </div>
            <div className="flex-1 flex justify-center space-x-3">
              <button
                onClick={() =>
                  setShowSelection(showSelection === "rulers" ? "" : "rulers")
                }
                className="bg-slate-300 px-2 py-1 text-xs rounded-sm flex items-center justify-between"
              >
                Rulers
                {showSelection === "rulers" ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() =>
                  setShowSelection(showSelection === "sets" ? "" : "sets")
                }
                className="bg-slate-300 px-2 py-1 text-xs rounded-sm flex items-center justify-between"
              >
                Sets
                {showSelection === "sets" ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="flex ml-2 space-x-2">
              <button
                onClick={() => setCoinLayout("grid")}
                className="text-slate-500 w-4 h-4 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center"
              >
                <ViewGridIcon />
              </button>
              <button
                onClick={() => setCoinLayout("list")}
                className="text-slate-500 w-4 h-4 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center"
              >
                <ViewBoardsIcon className="rotate-90" />
              </button>
              <button className="text-slate-500 w-4 h-4 hover:scale-110 transition-transform ease-out duration-120 flex justify-center items-center">
                <TableIcon />
              </button>
            </div>
          </div>

          {showSelection !== "" && showSelection === "rulers" && (
            <div className="w-full h-fit flex justify-center items-center border-b-[1px] border-gray-300">
              <div className="w-4/5 grid grid-flow-col grid-rows-3 gap-y-2 overflow-x-scroll px-2 py-4">
                {name === "Gupta" &&
                  (data as any).rulersArr.map((item: string, index: number) => (
                    <div
                      key={index}
                      onClick={() => filterHandler(item, item)}
                      className={`${
                        filters.has(item) ? "bg-red-400" : "bg-yellow-400 "
                      } px-2 py-1 rounded-md w-fit flex justify-center items-center cursor-pointer`}
                    >
                      <span
                        className={`${
                          filters.has(item) ? "text-red-700" : "text-yellow-700"
                        } whitespace-nowrap text-xs `}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {showSelection !== "" && showSelection === "sets" && (
            <div className="w-full max-h-fit flex justify-center items-center border-b-[1px] border-gray-300">
              <div className="w-4/5 flex justify-center space-x-4 px-2 py-2 ">
                <button className="text-xs bg-slate-300 rounded-md px-2 py-1">
                  Priority
                </button>
                <button
                  onClick={() => {
                    setStatus(status === "wishlist" ? "owned" : "wishlist");
                  }}
                  className="text-xs bg-slate-300 rounded-md px-2 py-1"
                >
                  Desired
                </button>
              </div>
            </div>
          )}

          {/* {name === "Gupta" && (
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
          )} */}
          {/* <div className="h-10 flex justify-end border-b-[1px] border-gray-200 space-x-4 px-4 items-center">
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
          </div> */}
        </div>
        <div className="w-full flex justify-center py-6">
          {coinLayout === "grid" ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-y-6 px-8 h-full w-full items-center justify-items-center">
              {(data as any).coinObjs.map((item: any, index: any) => (
                <CoinCard coin={item} key={`long-${index}`} />
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col px-6 space-y-4">
              {(data as any).coinObjs.map((item: any, index: any) => (
                <LongCoinCard coin={item} key={`long-${index}`} />
              ))}
            </div>
          )}
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
