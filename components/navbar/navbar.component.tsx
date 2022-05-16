import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex justify-between w-screen bg-zinc-200">
      <div className="p-2 mx-2">
        <ul className="flex">
          <li className="mx-1">
            <Link href="/">Home</Link>
          </li>
          <li className="mx-1">
            <Link href="/addcoin">Add Coin</Link>
          </li>
          <li className="mx-1">
            <Link href="/collection">View Collection</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
