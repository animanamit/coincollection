import Link from "next/link";
import { GlassMagnifier } from "react-image-magnifiers";

const CoinCard = ({ data, magnifierSize }) => {
  return (
    <div className="bg-black shadow-2xl m-1 rounded-xl md:h-[500px] md:w-[600px] sm:width=[200px] flex flex-col">
      <div className="relative flex w-auto h-[310px] rounded-t-xl bg-black">
        <GlassMagnifier
          imageSrc={data.url[0]}
          largeImageSrc={data.url[0]}
          imageAlt="Example"
          allowOverflow={false}
          magnifierBorderSize={1}
          magnifierSize={`${magnifierSize}%`}
          square={false}
          style={{ width: "300px" }}
          className="rounded-t-xl"
        />
        <GlassMagnifier
          imageSrc={data.url[1]}
          largeImageSrc={data.url[1]}
          imageAlt="Example"
          allowOverflow={false}
          magnifierBorderSize={1}
          magnifierSize={`${magnifierSize}%`}
          square={false}
          style={{ width: "300px" }}
          className="rounded-t-xl"
        />
      </div>
      <div className="flex flex-col h-full px-8 py-4 bg-white rounded-b-xl">
        <Link href={`/coin/${data.name}`}>
          <span className="text-2xl font-bold tracking-tight cursor-pointer text-zinc-800 hover:text-zinc-500">
            {data.name}
          </span>
        </Link>
        <span className="text-lg font-semibold tracking-tight text-zinc-800">
          {data.type}
        </span>
        <span className="text-lg font-semibold tracking-tight text-zinc-800">
          {data.class}
        </span>
        <span className="text-lg font-semibold tracking-tight text-zinc-800">
          {`Variety ${data.variation}`}
        </span>
        <span className="text-lg font-semibold tracking-tight text-zinc-800">
          {data.weight}
        </span>
      </div>
    </div>
  );
};

export default CoinCard;
