import { database } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import CoinCard from "../components/coin-card/coin-card.component";

const Collection = () => {
  const [coins, setCoins] = useState([]);
  const getCoins = async () => {
    const docRef = collection(database, "coins");
    const docSnap = await getDocs(docRef);

    const c = [];
    if (docSnap) {
      docSnap.forEach((doc) => {
        // document.push({
        //   ...doc.data(),
        //   id: doc.id
        // });
        console.log(doc);
        c.push({
          ...doc.data(),
        });
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    console.log(coins);
    setCoins(c);
  };

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <div>
      <div className="flex p-2">
        {coins.map((c) => (
          <CoinCard key={c.coinId} data={c} />
        ))}
      </div>
    </div>
  );
};

// export async function getStaticProps() {

// }
export default Collection;
