import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex justify-between w-screen p-6 bg-zinc-200">
      <div className="mx-2 uppercase">
        <ul className="flex">
          <li className="mx-2">
            <Link href="/">Home</Link>
          </li>
          <li className="mx-2">
            <Link href="/addcoin">Add Coin</Link>
          </li>
          <li className="mx-2">
            <Link href="/collection">View Collection</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
