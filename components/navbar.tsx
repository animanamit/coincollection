const Navbar = () => {
  return (
    <div className="sticky bg-slate-200  top-0 z-20 backdrop-filter backdrop-blur-lg bg-opacity-30 px-12">
      <div className="flex justify-between mx-auto items-center py-4">
        <div>
          <h1 className="text-gray-900 text-xl">Amit Srivastava</h1>
        </div>
        <div>
          <ul className="flex justify-evenly space-x-4">
            <li className="cursor-pointer hover:text-gray-500">Home</li>
            <li className="cursor-pointer hover:text-gray-500">Add Coin</li>
            <li className="cursor-pointer hover:text-gray-500">Collection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
