import Image from "next/image";
import { useState } from "react";
const CoinCard = ({ data }) => {
  const [img, setImg] = useState(data.url[0]);

  const handleMouseEnter = () => {
    setImg(data.url[1]);
  };

  const handleMouseLeave = () => {
    setImg(data.url[0]);
  };

  return (
    <div className="bg-black shadow-md m-1 rounded-xl h-[400px] w-[300px]  ">
      <div
        className="relative w-auto h-3/4 rounded-t-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={img}
          alt="example coin"
          layout="fill"
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
