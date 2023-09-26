
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";

import {  createSvgIcon } from "@mui/material";
import React from "react";


const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  "HOME"
);
export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
   
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
   

    <ListItemButton to="/">
      <ListItemIcon>
      <HomeIcon/>
      </ListItemIcon>
      <ListItemText primary="Home"  />
    </ListItemButton>
  </React.Fragment>
);
