import { Box, CircularProgress, Tooltip, createSvgIcon } from "@mui/material";
import logo from "../assets/image/logo.png";
import { NavLink } from "react-router-dom";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";

import { useSelector } from "react-redux";
import useAdmin from "../hooks/useAdmin";

const Sidebar = () => {
  const { email, isLoading: emailLodaing } = useSelector(
    state => state.userSlice
  );

  const isAdmin = useAdmin();

  const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    ""
  );

  return (
    <div className="h-screen sticky  top-0 border-r-2 border-secondary/20">
      <div className="flex flex-col items-center py-10 ">
        <img src={logo} alt="logo" />
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded-2xl bg-primary bg-green-400 cursor-pointer my-3 "
              : "p-2 rounded-2xl group hover:bg-primary text-secondary/40  my-3 cursor-pointer transition-all"
          }
        >
          <Tooltip title="Tasks">
            {" "}
            <HomeIcon color="primary" />
          </Tooltip>
        </NavLink>
   

        {isAdmin && (
          <>


<NavLink
          to="adminDashBoard"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded-2xl bg-primary bg-green-400 cursor-pointer my-3 "
              : "p-2 rounded-2xl group hover:bg-primary text-secondary/40  my-3 cursor-pointer transition-all"
          }
        >
          <Tooltip title="Dashboard">
            {" "}
            <DashboardCustomizeRoundedIcon color="primary" />
          </Tooltip>
        </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "p-1 font-bold rounded-2xl bg-primary bg-green-400 cursor-pointer my-3"
                  : "p-1 font-bold rounded-2xl group hover:bg-primary text-secondary-400 cursor-pointer transition-all  my-3"
              }
              to="/allTask"
            >
              All Tasks
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "p-2 rounded-2xl bg-primary bg-green-400 cursor-pointer my-3"
                  : "p-2 rounded-2xl group hover:bg-primary text-secondary-400 cursor-pointer transition-all my-3"
              }
              to="/manageUsers"
            >
              <Tooltip title="Manage Users">
                <ManageAccountsRoundedIcon />
              </Tooltip>
            </NavLink>
          </>
        )}

<NavLink
          to="UserDashBoard"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded-2xl bg-primary bg-green-400 cursor-pointer my-3 "
              : "p-2 rounded-2xl group hover:bg-primary text-secondary/40  my-3 cursor-pointer transition-all"
          }
        >
          <Tooltip title="Dashboard">
            {" "}
            <DashboardCustomizeRoundedIcon color="primary" />
          </Tooltip>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded-2xl bg-primary bg-green-400 cursor-pointer my-3"
              : "p-2 rounded-2xl group hover:bg-primary text-secondary-400 cursor-pointer transition-all  my-3"
          }
        >
          <Tooltip title="Profile">
            {" "}
            <Person2RoundedIcon />
          </Tooltip>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
