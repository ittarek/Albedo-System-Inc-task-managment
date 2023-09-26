import { useState } from "react";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import AddTaskModal from "./../../components/task/AddTaskModal";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CreateNewFolderRoundedIcon from "@mui/icons-material/CreateNewFolderRounded";

import Button from "@mui/joy/Button";
import { handleLogOut, logout } from "../../redux/fetures/task/userSlice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useGetTaskQuery } from "../../redux/fetures/api/baseApi";
import { useDispatch, useSelector } from "react-redux";

const Tasks = () => {

  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { email,name, photoURL } = useSelector(state => state.userSlice);
  const [taskId, setTaskId] = useState(0);
  const dispatch = useDispatch();
  const { data: tasksData, isLoading } = useGetTaskQuery();
  const tasks = tasksData?.filter(data => data.assignEmail === email);
console.log(tasksData);



  // material ui function
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // handle Logout
  const handleLogoutUser = () => {
    dispatch(logout());
    dispatch(handleLogOut())
  };
  const handleModal = id => {
    setTaskId(id);
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="h-screen mx-5 mt-1">
        <div className="  px-10 pt-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-3xl">Tasks</h1>
            </div>
            <div className="flex gap-5">
              <button className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10 grid place-content-center text-secondary hover:text-white transition-all">
                {/* <BellIcon className="h-6 w-6" /> */}
                <SearchRoundedIcon />
              </button>
              <button onClick={() => setOpen(!open)}>
                {" "}
                <CreateNewFolderRoundedIcon /> Add Task
              </button>
              <AddTaskModal open={open} setOpen={setOpen} />

              <div className="h-10 w-10 rounded-xl ">
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title={name ? name : "no name"}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="User"
                        src={photoURL ? photoURL : "No"}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Typography>
                      <MenuItem>
                        {" "}
                        <Link to="/login">Login</Link>{" "}
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <Link to="/signUp">Signup</Link>
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <Link to="#">Dashboard</Link>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          onClick={handleLogoutUser}
                          color="warning"
                          variant="outlined"
                        >
                          Logout
                        </Button>
                      </MenuItem>
                    </Typography>
                  </Menu>
                </Box>
              </div>
            </div>
          </div>
        </div>
     <div>
     <TableContainer component={Paper} className="mt-5">
          <Table sx={{ minWidth: "800px" }} aria-label="simple table">
            <TableHead className="bg-gray-300">
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="left">Deadline</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"> Created By</TableCell>
                <TableCell align="left">Tag</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {tasks?.map(
              ({
                _id,
                title,
                description,
                status,
                assignTo,
                date,
                priority,
              }) => (
                <TableRow
                  key={_id}
                  component={Link}
                  to={`/details/${_id}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <h2
                      className={`  uppercase 
   ${priority === "high" ? "text-red-500" : ""}
   ${priority === "medium" ? "text-yellow-500" : ""}
   ${priority === "low" ? "text-green-500" : ""}`}
                    >
                      {" "}
                      {title}
                    </h2>
                  </TableCell>
                  <TableCell align="left">{date}</TableCell>
                  <TableCell align="left">
                    <h2
                      className={`uppercase 
   ${priority === "high" ? "text-red-500" : ""}
   ${priority === "medium" ? "text-yellow-500" : ""}
   ${priority === "low" ? "text-green-500" : ""}`}
                    >
                      {" "}
                      {status}
                    </h2>
                  </TableCell>
                  <TableCell align="left">{assignTo}</TableCell>
                  <TableCell align="left">{description}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          </Table>
        </TableContainer>
     </div>
      </div>
    </div>
  );
};

export default Tasks;
