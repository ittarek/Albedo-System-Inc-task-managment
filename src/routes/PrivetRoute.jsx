import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import auth from "../firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { setUser, toggleLoading } from "../redux/fetures/task/userSlice";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
const PrivetRoute = ({ children }) => {
  const { email, isLoading } = useSelector(state => state.userSlice);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      dispatch(toggleLoading(true));
      console.log("privet route", user);

      if (user) {
        dispatch(
          setUser({
            email: user?.email,
            name: user?.displayName,
            photoURL: user?.photoURL
          })
        );
        dispatch(toggleLoading(false));
      } else {
        dispatch(toggleLoading(false));
      }
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // if user not login at first confirm this message then login user

  if (!email) {
    Swal.fire("Stop!", "You have to log in first to continue", "error");
  } else if (email) {
    return children;
  }
  return <Navigate state={{ from: location }} replace to="/login"></Navigate>;
};

export default PrivetRoute;
