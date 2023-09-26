import { Outlet } from "react-router-dom";
import NavBar from "../components/sharedComponets/NavBar";
import Footer from "../components/sharedComponets/Footer";
import Sidebar from "./Sidebar";

const MainLayOut = () => {
  return (
    <>
      <NavBar></NavBar>
  
        <div className="flex">
      <div className="w-[80px]">
        <Sidebar />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>

      {/* <Footer></Footer> */}
    </>
  );
};

export default MainLayOut;
