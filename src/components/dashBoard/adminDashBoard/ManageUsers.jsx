import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useGetUserQuery,
  useMakeAdminMutation,
  useMakeUserMutation,
} from "../../../redux/fetures/api/baseApi";
import { Button } from "@mui/joy";
import Swal from "sweetalert2";
// import { useGetUserQuery } from '../../../redux/fetures/api/userApi';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ManageUsers = () => {
  const { data: userData, isLoading } = useGetUserQuery();
  const [makeAdmin, { data, error, isSuccess }] = useMakeAdminMutation();
  const [makeUser, { data: makeUserData, error: userError, isSuccess:userIsSuccess }] = useMakeUserMutation();

  // make admin
  const handleAdmin = user => {
    Swal.fire({
      title: "Are you sure?",
      text: "are you sure add this user admin ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add !",
    }).then(result => {
      if (result.isConfirmed) {
        makeAdmin({
          id: user._id,
        });
        if (!isSuccess) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    })};
  // make user
  const handleUser = user => {
    Swal.fire({
      title: "Are you sure?",
      text: "are you sure add this user User ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add !",
    }).then(result => {
      if (result.isConfirmed) {
        makeUser({
          id: user._id,
        });
        if (!isSuccess) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an User Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const newLocal = <TableRow>
    <StyledTableCell>Name</StyledTableCell>
    <StyledTableCell align="right">Email</StyledTableCell>
    <StyledTableCell align="right">Assign Task</StyledTableCell>
    <StyledTableCell align="right">Progress Task</StyledTableCell>
    <StyledTableCell align="right">Done Task</StyledTableCell>
    <StyledTableCell align="right">Is Admin</StyledTableCell>
    <StyledTableCell align="right">Make Admin</StyledTableCell>
  </TableRow>;
  return (
    <div>
      <h2 className="uppercase text-center font-bold mt-5 text-4xl">
        Manage users
      </h2>
      <div className="mx-5 my-11">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              {newLocal}
            </TableHead>
            <TableBody>
              {userData?.map(user => (
                <StyledTableRow key={user._id}>
                  <StyledTableCell component="th" scope="row">
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.email}</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right">
                    {user.roll ? user.roll : "User"}
                  </StyledTableCell>
                <>
                { user.roll === "admin"?  <StyledTableCell align="right">
                    <Button
                      // disabled={user.roll === "user"}
                      onClick={() => handleUser(user)}
                    >
                      Make User
                    </Button>
                  </StyledTableCell>   :
                 
                  
                  
                  <StyledTableCell align="right">
                    <Button
                      // disabled={user.roll === "admin"}
                      onClick={() => handleAdmin(user)}
                    >
                      Make Admin
                    </Button>
                  </StyledTableCell>
                  
                  }
                </>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ManageUsers;
