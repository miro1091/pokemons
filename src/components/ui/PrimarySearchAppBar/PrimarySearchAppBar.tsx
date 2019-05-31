import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../../../reducer/Context";
import { ActionType } from "../../../reducer/type";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import useStyles from "./primarySearchAppBar.style";

function PrimarySearchAppBar({ history }: { history: any }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const context = useContext(Context);
  const [types, setTypes] = useState([] as any);
  const [defPokemons, setDefPokemons] = useState([] as any);

  const searchInput = (e: any) => {
    let userInput = e.target.value.trim();
    userInput = userInput
      .split(",")
      .map((item: string) => (item.trim() ? item.trim() : null));

    const newPoks = defPokemons.filter((item: any) => {
      const joinTypes = item.types.join("");

      if (
        joinTypes.includes(userInput[0]) ||
        joinTypes.includes(userInput[1]) ||
        joinTypes.includes(userInput[2])
      ) {
        return true;
      }
      return false;
    });

    context.dispatch({
      type: ActionType.UPDATE_POKEMONS,
      payload: {
        pokemons: newPoks.length > 0 ? newPoks : defPokemons
      }
    });
  };

  const seachFocus = () => {
    history.push("/");
  };

  useEffect(() => {
    setDefPokemons(context.state.pokemons);
  }, []);

  useEffect(() => {
    setTypes(context.state.pokemonTypes);
  }, [context.state.pokemonTypes]);

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>GitHub</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>GitHub</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/">
            <Typography className={classes.title} variant="h6" noWrap>
              HealthDex
            </Typography>
          </Link>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={searchInput}
              onFocus={seachFocus}
              placeholder={types.join(", ")}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-owns={isMenuOpen ? "material-appbar" : undefined}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
    </div>
  );
}

export default PrimarySearchAppBar;
