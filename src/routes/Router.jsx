
import {
  createBrowserRouter,

} from "react-router-dom";

import MainLayOut from "../layOut/MainLayOut";
import Home from "../pages/homepage/Home";
import Login from "../pages/loginPage/Login";

import Signup from "../pages/signupPage/Signup";
import Tasks from "../pages/tasks/Tasks";
import PrivetRoute from "./PrivetRoute";
import MyModal from "../components/ui/MyModal";
import TaskDetailsModal from "../components/task/TaskDetailsModal";
import Profile from "../pages/homepage/landingPage/profilePage/Profile";
import AllTaskManage from './../components/dashBoard/adminDashBoard/AllTaskManage';
import ManageUsers from "../components/dashBoard/adminDashBoard/ManageUsers";
import AllTaskModal from './../components/dashBoard/adminDashBoard/AllTaskModal';
import UpdateTask from "../components/dashBoard/adminDashBoard/UpdateTask";
import UserDashboard from "../components/dashBoard/userDashboard/UserDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut/>,
    children: [
      // {
      //   index: true,
      //   element: <PrivetRoute><Tasks /></PrivetRoute>,
      // },
        {
            path: "/",
            element: <PrivetRoute><Home/></PrivetRoute>
        },{
            path: "/login",
            element: <Login/>
        },
        {
            path: "/signup",
            element: <Signup/>
        },{
          path: "/details/:id",
          element: <TaskDetailsModal/>
        },
        {
          path: "/profile",
          element: <Profile/>
        },
        {
          path: "/allTask",
          element: <AllTaskManage/>,
        },
        {
          path: "/manageUsers",
          element: <ManageUsers/>,
        },
        {
          path : "/allTaskModal/:id",
          element: <AllTaskModal/>
        },
        {
          path : "/updateTask/:id",
          element: <UpdateTask/>
        },
        {
          path : "/UserDashBoard",
          element: <UserDashboard/>
        }
    ]
  },
]);
