import Image from "next/image";
const CoinCard = () => {
  return (
    <div className="bg-blue-400  m-1 rounded-xl h-72 min-w-[250px]  ">
      <div className="h-3/4 w-auto relative rounded-t-xl">
        <Image
          src={"/coin.jpg"}
          alt="example coin"
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
      </div>
      <div className=" bg-red-500 h-1/4 rounded-b-xl"></div>
    </div>
  );
};

export default CoinCard;
