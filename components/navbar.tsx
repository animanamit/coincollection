import Link from "next/link";

const Navbar = () => {
  return (
    <div className=" bg-white top-0 z-20 backdrop-filter backdrop-blur-lg bg-opacity-30 px-12 border-b border-gray-200">
      <div className="flex justify-end mx-auto items-center py-4">
        {/* <div>
          <h1 className="text-gray-900 text-xl">Amit Srivastava</h1>
        </div> */}
        <div>
          <ul className="flex justify-evenly space-x-4">
            <Link href="/">
              <li className="cursor-pointer hover:text-black text-gray-700">
                Home
              </li>
            </Link>
            <Link href="/addcoin">
              <li className="cursor-pointer hover:text-black text-gray-700">
                Add Coin
              </li>
            </Link>
            {/* <Link href="/collection">
              <li className="cursor-pointer hover:text-black text-gray-700">
                Collection
              </li>
            </Link> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
