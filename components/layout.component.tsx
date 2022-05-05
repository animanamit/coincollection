import NavBar from "./navbar/navbar.component";

const Layout = ({ children }: any) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
