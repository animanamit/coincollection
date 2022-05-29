import { database } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import CoinCard from "../components/coin-card/coin-card.component";
import { useState } from "react";

const Collection = ({ coins }) => {
  const [magnifierSize, setMagnifierSize] = useState(30);

  const handleSize = (e) => {
    const value = e.target.value;
    setMagnifierSize(value);
  };

  return (
    <div className="p-8 bg-slate-50">
      <div className="my-2">
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
      </div>
      <div className="sm:flex sm:flex-col lg:grid-cols-2 lg:grid lg:row-auto lg:gap-y-4 lg: gap-x-2 2xl:grid 2xl:grid-cols-3 2xl:row-auto 2xl:gap-y-4 2xl:gap-x-4">
        {coins.map((coin) => (
          <CoinCard
            key={coin.coinId}
            data={coin}
            magnifierSize={magnifierSize}
          />
        ))}
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
