import Navbar from "./navbar";

const Layout = ({ children }: any) => {
  return (
    <div className="bg-white ">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
