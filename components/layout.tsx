import Navbar from "./navbar";

const Layout = ({ children }: any) => {
  return (
    <div className="bg-white h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
