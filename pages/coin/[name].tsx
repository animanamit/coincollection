import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { database } from "../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";

const Coin = () => {
  const router = useRouter();
  let { name } = router.query;

  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    const getCoinData = async () => {
      console.log(name);
      const q = query(collection(database, "coins"), where("name", "==", name));

      let coins = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        coins.push(doc.data());
      });

      coins.sort((coinA, coinB) => coinA.page - coinB.page);

      setCoinData(coins);
    };

    if (router.isReady) getCoinData();
  }, [router.isReady]);

  return (
    <div className="content-center h-screen p-4 bg-slate-100">
      {/* {coinData ? <h1>Loaded</h1> : <h1>Loading...</h1>} */}
      {coinData ? (
        <>
          <h1 className="text-4xl font-bold tracking-tight text-center uppercase text-zinc-800">
            {coinData[0].name}
          </h1>
          {coinData.map((coin) => (
            <div
              key={coin.coinId}
              className="flex py-8 my-4 shadow-xl bg-slate-100 rounded-2xl"
            >
              <div className="flex p-4 justify-evenly">
                <Image
                  src={coin.url[0]}
                  alt="example coin"
                  objectFit="contain"
                  className="rounded-2xl"
                  height={200}
                  width={200}
                />
                <Image
                  src={coin.url[1]}
                  alt="example coin"
                  objectFit="contain"
                  className="rounded-2xl"
                  height={200}
                  width={200}
                />
              </div>
              <div className="flex flex-col p-4 my-4">
                <p>{coin.type}</p>
                <p>{coin.class}</p>
                <p>{`Page ${coin.page}`}</p>
                <p>{coin.weight}</p>
              </div>
              <div className="flex flex-col my-4 justify-evenly">
                <div className="w-[400px] p-2">
                  <p>{coin.obs}</p>
                </div>
                <div className="w-[400px] p-2">
                  <p>{coin.rev}</p>
                </div>
              </div>
            </div>
          ))}
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
