import { Outlet } from "react-router-dom";
import DashHeader from "../components/DashHeader";
import DashFooter from "../components/DashFooter";

export default function DashLayout() {
  return (
    <>
      <DashHeader />
      <div className="py-3 px-2 flex-grow">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
}
