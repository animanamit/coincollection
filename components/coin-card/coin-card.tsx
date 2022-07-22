import { Dialog } from "@headlessui/react";
import Link from "next/link";

import { useState } from "react";
import Image from "next/image";

import { useMediaQuery } from "react-responsive";

interface set {
  setName: string;
  id: number;
  coinId: number;
  setId: number;
}

const CoinCard = ({ coin }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const isIPad = useMediaQuery({
    query: "(max-width: 700px)",
  });

  console.log(isIPad);
  const [dialogImageURL, setDialogImageURL] = useState("");
  return (
    <div className="bg-black hover:shadow-md rounded-xl sm:h-[350px] md:w-[400px] w-[300px] h-[300px] flex flex-col">
      <div className="relative flex w-auto h-[310px] rounded-t-xl bg-black">
        <div
          onClick={() => {
            setDialogImageURL(coin.obsPhoto);
            setIsOpen(true);
          }}
          className="sm:h-[200px] h-[150px]"
        >
          {/* {startMagnifying ? (
            <GlassMagnifier
              imageSrc={coin.url[0]}
              largeImageSrc={coin.url[0]}
              imageAlt="Example"
              allowOverflow={false}
              magnifierBorderSize={1}
              magnifierSize={`${magnifierSize}%`}
              square={false}
              style={{ width: "300px" }}
              className="rounded-t-xl"
            />
          ) : ( */}
          {coin.obsPhoto && (
            <Image
              src={coin.obsPhoto}
              alt="coin"
              className="rounded-tl-xl"
              width={isIPad ? 150 : 200}
              height={isIPad ? 150 : 200}
            />
          )}
          {/* // )} */}
        </div>
        <div
          onClick={() => {
            setDialogImageURL(coin.revPhoto);
            setIsOpen(true);
          }}
          className="sm:h-[200px] h-[150px]"
        >
          {/* {startMagnifying ? (
            <GlassMagnifier
              imageSrc={coin.url[1]}
              largeImageSrc={coin.url[1]}
              imageAlt="Example"
              allowOverflow={false}
              magnifierBorderSize={1}
              magnifierSize={`${magnifierSize}%`}
              square={false}
              style={{ width: "300px" }}
              className="rounded-t-xl"
            />
          ) : ( */}
          {coin.revPhoto && (
            <Image
              src={coin.revPhoto}
              className="rounded-tr-xl"
              height={isIPad ? 150 : 200}
              width={isIPad ? 150 : 200}
              alt="coin"
            />
          )}
          {/* )} */}
        </div>
      </div>
      <div className="flex flex-col h-full px-4 py-2 bg-white rounded-b-xl relative">
        {/* <Link href={`/coin/${coin.name}`}> */}
        <span
          onClick={() => console.log(coin)}
          className="text-lg font-bold tracking-tight cursor-pointer text-zinc-800 hover:text-zinc-500"
        >
          {coin.ruler}
        </span>
        {/* </Link> */}
        <span className="text-md font-medium tracking-tight text-gray-500">
          {coin.denomination}
        </span>
        <span className="text-md font-medium tracking-tight text-gray-500">
          {coin.catalogueNumber}
        </span>
        {/* <span className="text-lg font-semibold tracking-tight text-zinc-800">
          {coin.grade}
        </span> */}
        <span className="text-md font-medium tracking-tight text-gray-500">
          {coin.type}
        </span>
        <span className="text-md font-medium tracking-tight text-gray-500">
          {coin.class}
        </span>
        <span className="text-md font-medium tracking-tight text-gray-500">
          {coin.variety}
        </span>
        {/* <span className="text-lg font-semibold tracking-tight text-zinc-800">
          {coin.rarity}
        </span>
        <span className="text-lg font-semibold tracking-tight text-zinc-800">
          {coin.weight}
        </span> */}

        <div className="flex mt-1 justify-end space-x-2">
          {coin.sets.length > 0 && (
            <div className=" bg-yellow-400 px-2 py-1 rounded-full flex justify-center items-center">
              <span className="text-yellow-700  text-xs font-semibold">
                Priority
              </span>
            </div>
          )}
          {coin.status === "wishlist" && (
            <div className="bg-gray-400 px-2 py-1 rounded-full flex justify-center items-center">
              <span className="text-gray-700  text-xs font-semibold">
                Desired
              </span>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 bg-backdrop-blur"
      >
        <div className="fixed inset-0 flex items-center justify-center w-full bg-backdrop-blur ">
          <Dialog.Panel className="w-full h-full rounded bg-black/70">
            <div className="h-full w-fit">
              <Image
                src={dialogImageURL}
                className="max-h-screen mx-auto my-2 max-w-3/4"
                alt="large coin image"
                onClick={() => setIsOpen(false)}
                objectFit="contain"
                layout="fill"
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default CoinCard;
