import NavBar from "./navbar/navbar.component";

const Layout = ({ children }: any) => {
  return (
    <div>
      <NavBar />
      <main className="bg-zinc-200 ">{children}</main>
    </div>
  );
};

export default Layout;
