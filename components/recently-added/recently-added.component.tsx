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

    listAll(coinsRef)
      .then((res) => {
        // res.prefixes.forEach((folderRef) => {
        //   // All the prefixes under listRef.
        //   // You may call listAll() recursively on them.
        // });
        // res.items.forEach((itemRef) => {
        //   // All the items under listRef.
        // });
        console.log(res);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });

    // getDownloadURL(coinsRef)
    //   .then((url) => {
    //     // Insert url into an <img> tag to "download"
    //     console.log("success!", url);
    //   })
    //   .catch((error) => {
    //     // A full list of error codes is available at
    //     // https://firebase.google.com/docs/storage/web/handle-errors
    //     console.log(error);
    //     switch (error.code) {
    //       case "storage/object-not-found":
    //         // File doesn't exist
    //         break;
    //       case "storage/unauthorized":
    //         // User doesn't have permission to access the object
    //         break;
    //       case "storage/canceled":
    //         // User canceled the upload
    //         break;

    //       // ...

    //       case "storage/unknown":
    //         // Unknown error occurred, inspect the server response
    //         break;
    //     }
    //   });
  };
  return (
    <div className="flex flex-col py-2 items-center w-full relative">
      <h1 className="uppercase tracking-tight font-bold text-2xl">
        Recently Added
      </h1>
      <div className="flex overflow-y-scroll p-2 w-full">
        {Array(20)
          .fill(1)
          .map((_, index) => (
            <CoinCard key={index} />
          ))}
      </div>

      <div>
        <h3>get coins</h3>
        <button onClick={getCoins}>get coins</button>
      </div>
    </div>
  );
};

export default RecentlyAdded;
