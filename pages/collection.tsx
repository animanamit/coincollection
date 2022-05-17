import { database } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import CoinCard from "../components/coin-card/coin-card.component";

const Collection = ({ coins }) => {
  console.log(coins);
  return (
    <div className="p-8">
      <div>
        <label className="mx-1">Grid</label>
        <input type="checkbox" />
      </div>
      <div className="grid grid-cols-3 row-auto gap-y-4 gap-x-2 bg-zinc-200">
        {coins.map((coin) => (
          <CoinCard key={coin.coinId} data={coin} />
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
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

  return {
    props: {
      coins,
    },
  };
}
export default Collection;
