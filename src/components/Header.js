import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { FreeBreakfast, Home } from "@material-ui/icons";
import useStyles from "./HeaderClasses";
const Header = () => {
  const [open, setOpen] = useState(false);
  const headerClasses = useStyles();
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <AppBar className={headerClasses.header} position="static">
      <Toolbar className={headerClasses.toolbar}>
        <div className="left-menu">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={headerClasses.menuButton}
            onClick={handleToggle}
          >
            <MenuIcon />
          </IconButton>
          <Button variant="outlined" className={headerClasses.button}>
            <NavLink
              exact={true}
              to={"/coffe-counter"}
              className={headerClasses.link}
            >
              Home
            </NavLink>
            <Home style={{ color: "white" }} />
          </Button>
          <Button variant="outlined" className={headerClasses.button}>
            <NavLink
              to={"/coffe-counter/counter"}
              className={headerClasses.link}
            >
              Coffe-counter
            </NavLink>
            <FreeBreakfast style={{ color: "white" }} />
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
