/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import {
  PencilIcon,
  ShoppingCartIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useRouter } from "next/router";

const LongCoinCard = ({ coin }: any) => {
  const router = useRouter();

  let [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  let [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);

  const [dialogImageURL, setDialogImageURL] = useState("");

  const [isCoinDisplayOpen, setIsCoinDisplayOpen] = useState(false);

  let completeButtonRef = useRef(null);

  const purchaseCoin = async (id: string) => {
    await fetch("/api/purchaseCoin", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const setCoinAsPurchased = (id: string) => {
    toast
      .promise(
        fetch("/api/purchaseCoin", {
          method: "POST",
          body: JSON.stringify({ id: id }),
          headers: {
            "Content-Type": "application/json",
          },
        }),
        {
          loading: "Please wait...",
          success: "Coin has been set as purchased!",
          error: "Error! Something went wrong.",
        },
        {
          duration: 5000,
        }
      )
      .then(() => {
        // if (res.success) {
        console.log("finished");
        // router.reload();
      });
  };

  const deleteCoin = (id: string) => {
    toast
      .promise(
        fetch("/api/deleteCoin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id }),
        }),
        {
          loading: "Please wait...",
          success: "Coin has been deleted!",
          error: "Error! Something went wrong.",
        },
        {
          duration: 5000,
        }
      )
      .then(() => {
        // if (res.success) {
        console.log("finished");
        // router.reload();
      });
  };

  const addCoinToSet = (id: string) => {
    toast
      .promise(
        fetch("/api/addCoinToSet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id }),
        }),
        {
          loading: "Please wait...",
          success: "Coin has been added to Priority Set!",
          error: "Error! Something went wrong.",
        },
        {
          duration: 5000,
        }
      )
      .then(() => {
        // if (res.success) {
        console.log("finished");
        // router.reload();
      });
  };

  console.log(coin);

  return (
    <div className="bg-white rounded-xl hover:shadow-md flex px-4 py-8">
      <div className="flex bg-black justify-evenly h-[200px] w-[400px]">
        {coin.obsPhoto !== "" && (
          <div
            onClick={() => {
              setDialogImageURL(coin.obsPhoto);
              setIsCoinDisplayOpen(true);
            }}
          >
            <img
              src={coin.obsPhoto}
              alt="example coin"
              // objectFit="contain"
              height={200}
              width={200}
            />
          </div>
        )}
        {coin.revPhoto !== "" && (
          <div
            onClick={() => {
              setDialogImageURL(coin.revPhoto);
              setIsCoinDisplayOpen(true);
            }}
          >
            <Image
              src={coin.revPhoto}
              alt="example coin"
              objectFit="contain"
              height={200}
              width={200}
            />
          </div>
        )}
      </div>
      {(coin.obsRemarkPhoto !== "" || coin.revRemarkPhoto !== "") && (
        <div className="flex flex-col ml-3 h-[200px] w-[100px]">
          {coin.obsRemarkPhoto !== "" && (
            <div
              onClick={() => {
                setDialogImageURL(coin.obsRemarkPhoto);
                setIsCoinDisplayOpen(true);
              }}
              className="bg-black h-[100px]"
            >
              <Image
                src={coin.obsRemarkPhoto}
                alt="example coin"
                objectFit="contain"
                height={100}
                width={100}
              />
            </div>
          )}
          {coin.revRemarkPhoto !== "" && (
            <div
              onClick={() => {
                setDialogImageURL(coin.revRemarkPhoto);
                setIsCoinDisplayOpen(true);
              }}
              className="bg-black h-[100px]"
            >
              <Image
                src={coin.revRemarkPhoto}
                alt="example coin"
                objectFit="contain"
                height={100}
                width={100}
              />
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col my-4 ml-3 min-w-min whitespace-nowrap ">
        <p className="inline font-bold ">{coin.ruler}</p>
        <p className="inline  ">{coin.denomination}</p>
        <p className="inline  ">{coin.catalogueNumber}</p>
        <p className="inline  ">{coin.grade}</p>
        {coin.type && <p className="inline ">{coin.type}</p>}
        {coin.class && <p>{coin.class}</p>}
        {coin.variety && <p>{coin.variety}</p>}
        {coin.weight && <p>{coin.weight}</p>}
        {coin.rarity && <p>{coin.rarity}</p>}
        {coin.rating ? (
          <div className="flex items-center">
            <p className="mr-1">Condition</p>
            {new Array(coin.rating).fill(1).map((_, index) => (
              <StarIcon key={index} className="w-4 h-4 fill-zinc-900" />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col flex-1 my-4 ml-3 overflow-scroll min-w-min">
        {coin.obs && (
          <div>
            <p className="font-bold">Obverse</p>
            <p>{coin.obs}</p>
          </div>
        )}
        {coin.rev && (
          <div>
            <p className="font-bold">Reverse</p>
            <p>{coin.rev}</p>
          </div>
        )}
        {coin.remarks && (
          <div>
            <p className="font-bold">Remarks</p>
            <p>{coin.remarks}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center px-4 py-4 space-y-4 text-zinc-600">
        <TrashIcon
          onClick={() => setIsDeleteDialogOpen(true)}
          className="w-5 h-5 transition-transform duration-150 ease-out cursor-pointer hover:scale-150"
        />
        <Link href={`/edit/${coin.coinId}`}>
          <PencilIcon className="w-5 h-5 transition-transform duration-150 ease-out cursor-pointer hover:scale-150" />
        </Link>
        {coin.status === "wishlist" && (
          <ShoppingCartIcon
            onClick={() => setIsPurchaseDialogOpen(true)}
            className="w-5 h-5 transition-transform duration-150 ease-out cursor-pointer hover:scale-150"
          />
        )}
        <StarIcon
          onClick={() => addCoinToSet(coin.id)}
          className="w-5 h-5 transition-transform duration-150 ease-out cursor-pointer hover:scale-150"
        />
      </div>

      <Transition
        show={isDeleteDialogOpen}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          className="relative z-50"
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          initialFocus={completeButtonRef}
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center px-6 py-4">
            <Dialog.Panel className="w-full max-w-sm p-4 bg-white rounded-xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-zinc-800"
              >
                Delete Coin
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-zinc-800">
                  Are you sure you want to delete this coin?
                </p>
              </div>

              <div className="flex mt-4 space-x-2">
                <button
                  onClick={() => deleteCoin(coin.id)}
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
      <Transition
        show={isPurchaseDialogOpen}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          className="relative z-50"
          open={isPurchaseDialogOpen}
          onClose={() => setIsPurchaseDialogOpen(false)}
          initialFocus={completeButtonRef}
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center px-6 py-4">
            <Dialog.Panel className="w-full max-w-sm p-4 bg-white rounded-xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-zinc-800"
              >
                Mark Coin as Owned
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-zinc-800">
                  Do you want to mark this coin as owned?
                </p>
              </div>

              <div className="flex mt-4 space-x-2">
                <button
                  onClick={() => setCoinAsPurchased(coin.id)}
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={() => setIsPurchaseDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
      <Dialog
        open={isCoinDisplayOpen}
        onClose={() => setIsCoinDisplayOpen(false)}
        className="relative z-50 bg-backdrop-blur"
      >
        <div className="fixed inset-0 flex items-center justify-center w-full bg-backdrop-blur ">
          <Dialog.Panel className="w-full h-full rounded bg-black/70 ">
            <div className="h-full w-fit">
              <Image
                src={dialogImageURL}
                alt="large coin image"
                onClick={() => setIsCoinDisplayOpen(false)}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <Toaster />
    </div>
  );
};

export default LongCoinCard;
