/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { GlassMagnifier } from "react-image-magnifiers";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Image from "next/image";

const CoinCard = ({ data, magnifierSize, startMagnifying }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [dialogImageURL, setDialogImageURL] = useState("");

  return (
    <div className="bg-black shadow-2xl m-1 rounded-xl md:h-[500px] md:w-[600px] sm:width-[200px] flex flex-col">
      <div className="relative flex w-auto h-[310px] rounded-t-xl bg-black">
        <div
          onClick={() => {
            setDialogImageURL(data.url[0]);
            setIsOpen(true);
          }}
        >
          {startMagnifying ? (
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
          ) : (
            <Image src={data.url[0]} alt="coin" width={300} height={300} />
          )}
        </div>
        <div
          onClick={() => {
            setDialogImageURL(data.url[1]);
            setIsOpen(true);
          }}
        >
          {startMagnifying ? (
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
          ) : (
            <Image src={data.url[1]} height={300} width={300} alt="coin" />
          )}
        </div>
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
