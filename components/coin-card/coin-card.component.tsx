import Image from "next/image";
const CoinCard = ({ data }) => {
  return (
    <div className="bg-black shadow-lg m-1 rounded-xl h-[550px] w-[600px]">
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
      <div className="flex flex-col p-4 text-white bg-black h-1/4 rounded-b-xl">
        <span className="text-lg font-bold tracking-tight ">{data.name}</span>
        <span className="text-lg font-semibold tracking-tight ">
          {data.type}
        </span>
        <span className="text-lg font-semibold tracking-tight ">
          {data.class}
        </span>
        <span className="text-lg font-semibold tracking-tight ">
          {`Variety ${data.variation}`}
        </span>
      </div>
    </div>
  );
};

export default CoinCard;
