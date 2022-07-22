import Navbar from "./navbar";

const Layout = ({ children }: any) => {
  return (
    <div className="bg-white h-fit antialiased relative">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
