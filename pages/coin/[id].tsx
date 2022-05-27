import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { database } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

const Coin = () => {
  const router = useRouter();

  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    const getCoinData = async () => {
      let { id } = router.query;

      console.log(id);

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

    getCoinData();
  }, []);

  return (
    <div className="content-center h-screen p-4 bg-zinc-100">
      {coinData ? (
        <>
          <h1 className="mx-auto text-3xl font-bold tracking-tighter text-center uppercase">
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
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Coin;
