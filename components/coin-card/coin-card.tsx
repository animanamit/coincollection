import { Dialog } from "@headlessui/react";
import Link from "next/link";

import { useState } from "react";
import Image from "next/image";

const CoinCard = ({ coin }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const [dialogImageURL, setDialogImageURL] = useState("");
  return (
    <div className="bg-black hover:shadow-lg rounded-xl h-[380px] md:w-[400px] flex flex-col">
      <div className="relative flex w-auto h-[310px] rounded-t-xl bg-black">
        <div
          onClick={() => {
            setDialogImageURL(coin.obsPhoto);
            setIsOpen(true);
          }}
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
              width={200}
              height={200}
            />
          )}
          {/* // )} */}
        </div>
        <div
          onClick={() => {
            setDialogImageURL(coin.revPhoto);
            setIsOpen(true);
          }}
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
              height={200}
              width={200}
              alt="coin"
            />
          )}
          {/* )} */}
        </div>
      </div>
      <div className="flex flex-col h-full px-8 py-4 bg-white rounded-b-xl">
        <Link href={`/coin/${coin.name}`}>
          <span className="text-xl font-bold tracking-tight cursor-pointer text-zinc-800 hover:text-zinc-500">
            {coin.ruler}
          </span>
        </Link>
        <span className="text-lg font-semibold tracking-tight text-zinc-800">
          {coin.denomination}
        </span>
        <span className="text-lg font-semibold tracking-tight text-zinc-800">
          {coin.catalogueNumber}
        </span>
        <span className="text-lg font-semibold tracking-tight text-zinc-800">
          {coin.grade}
        </span>
        <span className="text-lg font-semibold tracking-tight text-zinc-800">
          {coin.class}
        </span>
        <span className="text-lg font-semibold tracking-tight text-zinc-800">
          {coin.variety}
        </span>
        <span className="text-lg font-semibold tracking-tight text-zinc-800">
          {coin.rarity}
        </span>
        <span className="text-lg font-semibold tracking-tight text-zinc-800">
          {coin.weight}
        </span>
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
