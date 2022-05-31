/* eslint-disable no-unused-vars */
import { database, storage } from "../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";

import { useState } from "react";

import CoinCard from "../coin-card/coin-card.component";
// import { useState } from "react";

interface CoinData {
  name: string;
  coinId: string;
  coinClass: string;
}

const RecentlyAdded = () => {
  //   const [currentIndex, setCurrentIndex] = useState(0);

  const [coinDataArr, setCoinDataArr] = useState<CoinData[]>([]);

  const getCoins = async () => {
    const q = query(collection(database, "coins"));
    const querySnapshot = await getDocs(q);
    const arr: CoinData[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      let { name, class: coinClass } = doc.data();
      arr.push({ coinId: doc.id, name, coinClass });
    });
    setCoinDataArr((coinDataArr) => arr);
    const coinsRef = ref(storage, "coins/");
  };
  return (
    <div className="relative flex flex-col items-center w-full py-2">
      <h1 className="text-2xl font-bold tracking-tight uppercase">
        Recently Added
      </h1>
      <div className="flex w-full p-2 overflow-y-scroll"></div>
    </div>
  );
};

export default RecentlyAdded;
