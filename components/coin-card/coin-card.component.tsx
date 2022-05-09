import Image from "next/image";
const CoinCard = () => {
  return (
    <div className="bg-blue-400 shadow-md m-1 rounded-xl h-72 min-w-[250px]  ">
      <div className="h-3/4 w-auto relative rounded-t-xl">
        <Image
          src={"/coin.jpg"}
          alt="example coin"
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
      </div>
      <div className=" bg-white h-1/4 rounded-b-xl p-2">
        <span className="tracking-tight text-zinc-800 font-bold text-lg">
          Chandigarh
        </span>
      </div>
    </div>
  );
};

export default CoinCard;
