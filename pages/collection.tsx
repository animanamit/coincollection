import { database } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import CoinCard from "../components/coin-card/coin-card.component";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import LongCoinCard from "../components/coin-card/long-coin-card.component";

const Collection = ({ coins }) => {
  const [enabled, setEnabled] = useState(false);

  const [startMagnifying, setStartMagnifying] = useState(false);

  const [magnifierSize, setMagnifierSize] = useState(30);

  const handleSize = (e) => {
    const value = e.target.value;
    setMagnifierSize(value);
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="my-2">
        <div className="flex  mx-2 justify-between">
          <div className="flex space-x-2">
            <Switch.Group>
              <Switch.Label>View</Switch.Label>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? "bg-blue-600" : "bg-gray-500"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    enabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white`}
                />
              </Switch>
            </Switch.Group>
          </div>
          <div className="flex space-x-2">
            <Switch.Group>
              <Switch.Label>Magnifier</Switch.Label>
              <Switch
                checked={startMagnifying}
                onChange={setStartMagnifying}
                className={`${
                  startMagnifying ? "bg-blue-600" : "bg-gray-500"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    startMagnifying ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white`}
                />
              </Switch>
            </Switch.Group>

            {startMagnifying ? (
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
        </div>
      </div>
      <div
        className={
          enabled
            ? ""
            : "sm:flex sm:flex-col lg:grid-cols-2 lg:grid lg:row-auto lg:gap-y-4 lg:gap-x-2 2xl:grid 2xl:grid-cols-3 2xl:row-auto 2xl:gap-y-4 2xl:gap-x-2"
        }
      >
        {coins.map((coin) =>
          enabled ? (
            <LongCoinCard coin={coin} key={coin.coinId} />
          ) : (
            <CoinCard
              data={coin}
              key={coin.coinId}
              magnifierSize={magnifierSize}
              startMagnifying={startMagnifying}
            />
          )
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const docRef = collection(database, "coins");
  const docSnap = await getDocs(docRef);

  const coins = [];
  if (docSnap) {
    docSnap.forEach((doc) => {
      console.log(doc);
      coins.push({
        ...doc.data(),
      });
    });
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

  coins.sort((itemA, itemB) => itemA.page - itemB.page);

  return {
    props: {
      coins,
    },
  };
}
export default Collection;
