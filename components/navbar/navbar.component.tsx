const NavBar = () => {
  return (
    <div className="bg-teal-100 w-screen flex justify-between">
      <div className="mx-2 p-2">
        <ul className="flex">
          <li className="mx-1">Home</li>
          <li className="mx-1">Add Coin</li>
          <li className="mx-1">View Collection</li>
          <li className="mx-1">Profile</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
