import {
  BookOpenIcon,
  ViewGridIcon,
  ViewBoardsIcon,
  TableIcon,
  PrinterIcon,
} from "@heroicons/react/outline";
import {
  SearchIcon as SolidSearchIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import CoinCard from "../../../components/coin-card/coin-card";
import LongCoinCard from "../../../components/coin-card/long-coin-card";

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

const searchForCoin = async (query: string) => {};

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
    return (
      <div className="h-full">
        <div className="w-full bg-white sticky top-0 z-20">
          <div className="h-20 flex justify-center items-center w-full border-b-[1px] border-gray-200 ">
            <h1 className="text-3xl font-bold tracking-tight text-center">
              {name}
            </h1>
          </div>

          <div className="sm:h-16 h-fit bg-white flex flex-col-reverse sm:flex-row space-y-2 sm:space-y-0 justify-between items-center px-4  py-2 border-b-[1px] border-gray-300">
            <div className="flex sm:flex-1 sm:space-x-3 py-2 sm:py-0">
              <button
                onClick={() =>
                  setShowSelection(showSelection === "rulers" ? "" : "rulers")
                }
                className={`flex items-center justify-between px-2 py-1 text-sm rounded-sm ${
                  showSelection === "rulers" ? "bg-gray-300" : "bg-white"
                }`}
              >
                Rulers
                {showSelection === "rulers" ? (
                  <ChevronUpIcon className="w-4 h-4" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() =>
                  setShowSelection(showSelection === "sets" ? "" : "sets")
                }
                className={`${
                  showSelection === "sets" ? "bg-gray-300" : "bg-white"
                } flex items-center justify-between px-2 py-1 text-sm rounded-sm `}
              >
                Sets
                {showSelection === "sets" ? (
                  <ChevronUpIcon className="w-4 h-4" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="flex sm:ml-2 py-2 sm:py-0 space-x-4">
              <button className="flex items-center justify-center w-5 h-5 text-gray-500 transition-transform ease-out rounded-md hover:scale-110 duration-120">
                <BookOpenIcon className="w-5 h-5 " />
              </button>
              <button
                onClick={() => setCoinLayout("grid")}
                className="flex items-center justify-center w-5 h-5 text-gray-500 transition-transform ease-out hover:scale-110 duration-120"
              >
                <ViewGridIcon className="w-5 h-5 " />
              </button>
              <button
                onClick={() => setCoinLayout("list")}
                className="flex items-center justify-center w-5 h-5 text-gray-500 transition-transform ease-out hover:scale-110 duration-120"
              >
                <ViewBoardsIcon className="w-5 h-5 rotate-90" />
              </button>
              <button className="flex items-center justify-center w-5 h-5 text-gray-500 transition-transform ease-out hover:scale-110 duration-120">
                <TableIcon className="w-5 h-5 " />
              </button>
              <button className="flex items-center justify-center w-5 h-5 text-gray-500 transition-transform ease-out hover:scale-110 duration-120">
                <PrinterIcon className="w-5 h-5 " />
              </button>
            </div>

            <div>
              <form
                onSubmit={() => {
                  console.log("search");
                }}
                className="flex items-center px-2 ml-2 w-72 bg-gray-50"
              >
                {
                  // TODO: create query for search and reroute/restructure data
                }
                <input
                  placeholder="Search for..."
                  className="w-full px-2 py-2 text-sm bg-gray-50"
                />
                <SolidSearchIcon className="w-5 h-5 ml-2 text-gray-500" />
              </form>
            </div>
          </div>

          {showSelection !== "" && showSelection === "rulers" && (
            <div className="w-full h-fit flex px-12 items-center border-b-[1px] border-gray-300">
              <div className="flex px-2 py-4 space-x-2 overflow-x-scroll">
                {name === "Gupta" &&
                  (data as any).rulersArr.map((item: string, index: number) => (
                    <div
                      key={index}
                      onClick={() => filterHandler(item, item)}
                      className={`${
                        filters.has(item) ? "bg-gray-300" : "bg-white "
                      } px-2 py-1 rounded-sm w-fit flex justify-center items-center cursor-pointer`}
                    >
                      <span className="whitespace-nowrap text-sm">{item}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {showSelection !== "" && showSelection === "sets" && (
            <div className="w-full max-h-fit flex px-12 items-center border-b-[1px] border-gray-300">
              <div className="flex w-4/5 px-2 py-2 space-x-2 ">
                <button className={`px-2 py-1 text-sm bg-white rounded-sm`}>
                  Priority
                </button>
                <button
                  onClick={() => {
                    setStatus(status === "wishlist" ? "owned" : "wishlist");
                  }}
                  className={` ${
                    status === "wishlist" ? "bg-gray-300" : "bg-white"
                  } px-2 py-1 text-sm rounded-sm`}
                >
                  Desired
                </button>
                <button
                  className="text-sm px-2 py-1 rounded-sm"
                  // onClick={() => {
                  //   setStatus(status === "wishlist" ? "owned" : "wishlist");
                  // }}
                  // className={` ${
                  //   status === "wishlist" ? "bg-gray-300" : "bg-white"
                  // } px-2 py-1 text-sm rounded-sm`}
                >
                  Normal
                </button>
              </div>
            </div>
          )}
        </div>

        {(data as any).coinObjs.length > 0 ? (
          <div className="flex justify-center w-full sm:py-6 py-2">
            {coinLayout === "grid" ? (
              <div className="sm:grid items-center w-full h-full lg:px-8 lg:grid-cols-3 sm:grid-cols-2  sm:gap-y-6 sm:justify-items-center space-y-4 sm:space-y-0 flex flex-col">
                {(data as any).coinObjs.map((item: any, index: any) => (
                  <CoinCard coin={item} key={`long-${index}`} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col w-full px-6 space-y-4">
                {(data as any).coinObjs.map((item: any, index: any) => (
                  <LongCoinCard coin={item} key={`long-${index}`} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center h-44">
            <h1 className="text-gray-800 text-xl font-normal tracking-normal">
              No Coins Found
            </h1>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="w-full bg-white ">
        <div className="h-20 flex justify-center items-center w-full border-b-[1px] border-gray-200 ">
          <h1 className="text-3xl font-bold tracking-tight text-center">
            {name}
          </h1>
        </div>

        <div className="h-16 bg-white flex justify-between items-center px-4  py-2 border-b-[1px] border-gray-300">
          <div className="flex flex-1 space-x-3">
            <button
              onClick={() =>
                setShowSelection(showSelection === "rulers" ? "" : "rulers")
              }
              className={`flex items-center justify-between px-2 py-1 text-sm rounded-sm ${
                showSelection === "rulers" ? "bg-gray-500" : "bg-white"
              }`}
            >
              Rulers
              {showSelection === "rulers" ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() =>
                setShowSelection(showSelection === "sets" ? "" : "sets")
              }
              className={`${
                showSelection === "sets" ? "bg-gray-500" : "bg-white"
              } flex items-center justify-between px-2 py-1 text-sm rounded-sm `}
            >
              Sets
              {showSelection === "sets" ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="flex ml-2 space-x-4">
            <button className="flex items-center justify-center w-5 h-5 text-gray-500 transition-transform ease-out rounded-md hover:scale-110 duration-120">
              <BookOpenIcon className="w-5 h-5 " />
            </button>
            <button
              onClick={() => setCoinLayout("grid")}
              className="flex items-center justify-center w-5 h-5 text-gray-500 transition-transform ease-out hover:scale-110 duration-120"
            >
              <ViewGridIcon className="w-5 h-5 " />
            </button>
            <button
              onClick={() => setCoinLayout("list")}
              className="flex items-center justify-center w-5 h-5 text-gray-500 transition-transform ease-out hover:scale-110 duration-120"
            >
              <ViewBoardsIcon className="w-5 h-5 rotate-90" />
            </button>
            <button className="flex items-center justify-center w-5 h-5 text-gray-500 transition-transform ease-out hover:scale-110 duration-120">
              <TableIcon className="w-5 h-5 " />
              {
                // TODO: create table of coins which can be printed, with the option of having photo or not
              }
            </button>
            <button className="flex items-center justify-center w-5 h-5 text-gray-500 transition-transform ease-out hover:scale-110 duration-120">
              <PrinterIcon className="w-5 h-5 " />
            </button>
          </div>

          <div>
            <form
              onSubmit={() => {
                console.log("search");
              }}
              className="flex items-center px-2 ml-2 w-72 bg-gray-50"
            >
              <input
                placeholder="Search for..."
                className="w-full px-2 py-2 text-sm bg-gray-50"
              />
              <SolidSearchIcon className="w-5 h-5 ml-2 text-gray-500" />
            </form>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="mt-8 text-3xl font-semibold tracking-tight">
            Loading...
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Coinage;
