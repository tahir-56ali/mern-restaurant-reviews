import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";

const RootLayout = () => {
  return (
    <div>
      <MainHeader />
      <div className="container mt-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default RootLayout;
