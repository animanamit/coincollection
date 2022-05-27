import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { database } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

const Coin = () => {
  const router = useRouter();
  let { id } = router.query;

  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    const getCoinData = async () => {
      const docRef = doc(database, "coins", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setCoinData(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    if (router.isReady) getCoinData();
  }, [router.isReady]);

  return (
    <div className="content-center h-screen p-4 bg-slate-50">
      {coinData ? (
        <>
          <h1 className="mx-auto text-4xl font-bold tracking-tight text-center uppercase text-zinc-800">
            {coinData.name}
          </h1>
          <div className="flex my-4 justify-evenly">
            <Image
              src={coinData.url[0]}
              alt="example coin"
              objectFit="contain"
              className="rounded-2xl"
              height={400}
              width={400}
            />
            <Image
              src={coinData.url[1]}
              alt="example coin"
              objectFit="contain"
              className="mx-1 rounded-xl"
              height={400}
              width={400}
            />
          </div>
          <div className="flex my-4 justify-evenly">
            <div className="w-[400px] p-2">
              <p>{coinData.obs}</p>
            </div>
            <div className="w-[400px] p-2">
              <p>{coinData.rev}</p>
            </div>
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
