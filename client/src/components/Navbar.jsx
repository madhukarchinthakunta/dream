import React from "react";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";
import "../styles/Navbar.scss";

function Navbar() {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const [search, setSearch] = useState("")
    const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>
      <div className="navbar_search">
        <input type="text" placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton>
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>
      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            Become A Host
          </a>
        ) : (
          <a href="/login" className="host">
            Become A Host
          </a>
        )}
        <button className="navbar_right_account"
        onClick={() => setDropdownMenu(!dropdownMenu)}
        >
        <Menu sx={{ color: variables.darkgrey }} />
        {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>
        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}>Trip List</Link>
            <Link to={`/${user._id}/wishList`}>Wish List</Link>
            <Link to={`/${user._id}/properties`}>Property List</Link>
            <Link to={`/${user._id}/reservations`}>Reservation List</Link>
            <Link to="/create-listing">Become A Host</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;