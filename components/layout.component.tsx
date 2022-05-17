import NavBar from "./navbar/navbar.component";

const Layout = ({ children }: any) => {
  return (
    <>
      <NavBar />
      <main className="bg-zinc-200">{children}</main>
    </>
  );
};

export default Layout;
