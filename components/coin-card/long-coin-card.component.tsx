import { Dialog, Transition } from "@headlessui/react";
import { PencilIcon, StarIcon, TrashIcon } from "@heroicons/react/outline";
import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { database } from "../../firebase/firebase";

type Inputs = {
  coin: {
    name: string;
    class: string;
    obs: string;
    rev: string;
    page: string;
    weight: string;
    variation: string;
    type: string;
    collection: string;
    url: string;
    remarks: string;
    rating: number;
    rarity: string;
    coinId: string;
    dateAdded: string;
  };
};

const LongCoinCard = ({ coin }: Inputs) => {
  let [isOpen, setIsOpen] = useState(false);

  const [dialogImageURL, setDialogImageURL] = useState("");

  const [isCoinDisplayOpen, setIsCoinDisplayOpen] = useState(false);

  let completeButtonRef = useRef(null);

  const router = useRouter();

  const deleteCoin = async () => {
    await deleteDoc(doc(database, "coins", coin.coinId));

    alert("You have deleted this coin.");

    router.reload();
  };

  return (
    <div
      key={coin.coinId}
      className="flex px-4 py-8 my-4 overflow-x-scroll shadow-xl bg-slate-100 rounded-2xl h-[276px]"
    >
      <div className="flex bg-black justify-evenly max-h-fit">
        <div
          onClick={() => {
            setDialogImageURL(coin.url[0]);
            setIsCoinDisplayOpen(true);
          }}
        >
          <Image
            src={coin.url[0]}
            alt="example coin"
            objectFit="contain"
            height={200}
            width={200}
          />
        </div>
        <div
          onClick={() => {
            setDialogImageURL(coin.url[1]);
            setIsCoinDisplayOpen(true);
          }}
        >
          <Image
            src={coin.url[1]}
            alt="example coin"
            objectFit="contain"
            height={200}
            width={200}
          />
        </div>
      </div>
      {coin.url.length > 2 && (
        <div className="flex flex-col ml-3 bg-black">
          <div
            onClick={() => {
              setDialogImageURL(coin.url[2]);
              setIsCoinDisplayOpen(true);
            }}
          >
            <Image
              src={coin.url[2]}
              alt="example coin"
              objectFit="contain"
              height={100}
              width={100}
            />
          </div>
          <div
            onClick={() => {
              setDialogImageURL(coin.url[3]);
              setIsCoinDisplayOpen(true);
            }}
          >
            <Image
              src={coin.url[3]}
              alt="example coin"
              objectFit="contain"
              height={100}
              width={100}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col my-4 ml-3 min-w-min whitespace-nowrap ">
        {coin.name && <p className="inline font-bold ">{coin.name}</p>}
        {coin.type && <p className="inline font-bold">{coin.type}</p>}
        {coin.class && <p>{coin.class}</p>}
        {coin.variation && <p>Variety {coin.variation}</p>}
        {coin.weight && <p>{coin.weight}</p>}
        {coin.rarity && <p>Rarity {coin.rarity}</p>}
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
          onClick={() => setIsOpen(true)}
          className="w-5 h-5 transition-transform duration-150 ease-out cursor-pointer hover:scale-150"
        />
        <Link href={`/edit/${coin.coinId}`}>
          <PencilIcon className="w-5 h-5 transition-transform duration-150 ease-out cursor-pointer hover:scale-150" />
        </Link>
      </div>

      <Transition
        show={isOpen}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          className="relative z-50"
          open={isOpen}
          onClose={() => setIsOpen(false)}
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
                  onClick={deleteCoin}
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={() => setIsOpen(false)}
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
    </div>
  );
};

export default LongCoinCard;
