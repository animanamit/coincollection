import Image from "next/image";
const CoinCard = ({ data }) => {
  return (
    <div className="bg-black shadow-md m-1 rounded-xl h-[400px] w-[600px]  ">
      <div className="relative flex w-auto h-3/4 rounded-t-xl">
        <Image
          src={data.url[0]}
          alt="example coin"
          objectFit="contain"
          className="rounded-t-xl"
          height={500}
          width={300}
        />
        <Image
          src={data.url[1]}
          alt="example coin"
          objectFit="contain"
          className="rounded-t-xl"
          height={500}
          width={300}
        />
      </div>
      <div className="p-2 bg-white h-1/4 rounded-b-xl">
        <span className="text-lg font-bold tracking-tight text-zinc-800">
          {data.name}
        </span>
      </div>
    </div>
  );
};

export default CoinCard;
