import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";

const RootLayout = () => {
  return (
    <div>
      <MainHeader />
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;
