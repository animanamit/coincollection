import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { database } from "../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import LongCoinCard from "../../components/coin-card/long-coin-card.component";

import { Switch } from "@headlessui/react";
import CoinCard from "../../components/coin-card/coin-card.component";

const Coin = () => {
  const router = useRouter();
  let { name } = router.query;

  const [coinData, setCoinData] = useState(null);

  const [enabled, setEnabled] = useState(false);

  const [magnifierSize, setMagnifierSize] = useState(30);

  const handleSize = (e) => {
    const value = e.target.value;
    setMagnifierSize(value);
  };

  useEffect(() => {
    const getCoinData = async () => {
      const q = query(collection(database, "coins"), where("name", "==", name));

      let coins = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        coins.push(doc.data());
      });

      coins.sort((coinA, coinB) => coinA.page - coinB.page);

      setCoinData(coins);
    };

    if (router.isReady) getCoinData();
  }, [router.isReady]);

  return (
    <div className="content-center p-4 h-vh bg-slate-100">
      {/* {coinData ? <h1>Loaded</h1> : <h1>Loading...</h1>} */}
      {coinData ? (
        <>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-center uppercase text-zinc-800">
              {coinData[0].name}
            </h1>
          </div>

          <div className="flex justify-between mx-2">
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? "bg-blue-600" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  enabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>

            {enabled ? (
              <label className="label-left">
                Magnifier Size:
                <select defaultValue="30" onChange={handleSize}>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                  <option value="25">25%</option>
                  <option value="30">30%</option>
                  <option value="35">35%</option>
                  <option value="40">40%</option>
                  <option value="45">45%</option>
                  <option value="50">50%</option>
                </select>
              </label>
            ) : (
              <></>
            )}
          </div>
          <div
            className={
              enabled
                ? "sm:flex mt-4 sm:flex-col lg:grid-cols-2 lg:grid lg:row-auto lg:gap-y-4 lg:gap-x-2 2xl:grid 2xl:grid-cols-3 2xl:row-auto 2xl:gap-y-4 2xl:gap-x-2"
                : ""
            }
          >
            {coinData.map((coin) =>
              enabled ? (
                <CoinCard
                  data={coin}
                  key={coin.coinId}
                  magnifierSize={magnifierSize}
                />
              ) : (
                <LongCoinCard coin={coin} key={coin.coinId} />
              )
            )}
          </div>
        </>
      ) : (
        <h1 className="text-4xl font-bold tracking-tight text-center text-zinc-800">
          Loading...
        </h1>
      )}
    </div>
  );
};

export default Coin;
