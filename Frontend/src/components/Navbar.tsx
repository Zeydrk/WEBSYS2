import React from "react";
import logo from "../imgs/istc-logo.png";

export default function Navbar() {
  return (
    <nav className="navbar bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/30 shadow-lg shadow-purple-500/20">
      <div className="navbar-start px-5">
        <img src={logo} alt="logo.png" className="size-8 mr-2" />
        <h1>PROJECT:ISTC</h1>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-5 gap-1.5">
          <li>
            <button>Home</button>
          </li>
          <li>
            <button>Shop</button>
          </li>
          <li>
            <button>Orders</button>
          </li>
          <li>
            <button>Contact Us</button>
          </li>
          <li>
            <button>Cart</button>
          </li>
          <li>
            <div className="dropdown dropdown-hover text-center">
              <div tabIndex={0} role="button">
                Account
              </div>
              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-25 p-2 shadow-sm left-1/2 -translate-x-1/2 "
              >
                <li>
                  <button> Profile</button>
                </li>
                <li>
                  <button> Logout </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
