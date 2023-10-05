import React from "react";
import { NavLink,Link } from "react-router-dom";
import {RiShoppingBag2Fill} from "react-icons/ri"

const header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand ">
             <RiShoppingBag2Fill/> SewChic
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" href="#">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/categories" className="nav-link" href="#">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/register"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/register"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Cart(0)
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default header;
