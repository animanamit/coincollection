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
      <div className="sm:flex sm:flex-col lg:grid-cols-2 lg:grid lg:row-auto lg:gap-y-4 lg: gap-x-4 2xl:grid 2xl:grid-cols-3 2xl:row-auto 2xl:gap-y-4 2xl:gap-x-4">
        {coins.map((coin) => (
          <CoinCard key={coin.coinId} data={coin} />
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
