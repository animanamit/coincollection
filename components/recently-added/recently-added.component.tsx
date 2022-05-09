import CoinCard from "../coin-card/coin-card.component";
// import { useState } from "react";

const RecentlyAdded = () => {
  //   const [currentIndex, setCurrentIndex] = useState(0);
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
      {/* <div className="absolute top-1/2 transform -translate-y-1/2 py-2 bg-red-500 w-full h-2 flex justify-between items-center px-3">
        <button>prev</button>
        <button>next</button>
      </div> */}
    </div>
  );
};

export default RecentlyAdded;
