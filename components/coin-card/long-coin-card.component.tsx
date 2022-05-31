import Image from "next/image";

import { useRouter } from "next/router";

import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

import { Dialog, Transition } from "@headlessui/react";
import { useRef, useState } from "react";

import Link from "next/link";

import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../../firebase/firebase";

const LongCoinCard = ({ coin }) => {
  let [isOpen, setIsOpen] = useState(false);

  let completeButtonRef = useRef(null);

  const router = useRouter();

  const deleteCoin = async () => {
    await deleteDoc(doc(database, "coins", coin.coinId));

    alert("You have successfully deleted this coin.");

    router.reload();
  };

  return (
    <div
      key={coin.coinId}
      className="flex px-4 py-8 my-4 shadow-xl bg-slate-100 rounded-2xl"
    >
      <div className="flex bg-black justify-evenly">
        <Image
          src={coin.url[0]}
          alt="example coin"
          objectFit="contain"
          height={200}
          width={200}
        />
        <Image
          src={coin.url[1]}
          alt="example coin"
          objectFit="contain"
          height={200}
          width={200}
        />
      </div>
      <div className="flex flex-col mx-3 my-4 min-w-min whitespace-nowrap ">
        <p className="inline font-bold">{coin.type}</p>
        <p>{coin.class}</p>
        <p>{coin.variation}</p>
        <p>{coin.weight}</p>
      </div>
      <div className="flex flex-col flex-1 px-4 my-4 overflow-scroll">
        <div>
          <p className="font-bold">Obverse</p>
          <p>{coin.obs}</p>
        </div>
        <div>
          <p className="font-bold">Reverse</p>
          <p>{coin.rev}</p>
        </div>
        <div>
          <p className="font-bold">Remarks</p>
          <p>{coin.remarks}</p>
        </div>
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
    </div>
  );
};

export default LongCoinCard;
