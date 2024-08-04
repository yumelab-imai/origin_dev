"use client"
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logout from "@/utils/admin/logout";

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            トップ
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem>
            <ListItemText primary="Option 1" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Option 2" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Option 3" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="ログアウト"
              onClick={() => {logout("user")}}
              style={{ cursor: 'pointer' }}
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
