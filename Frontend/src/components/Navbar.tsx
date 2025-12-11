// import React from "react";
import logo from "../imgs/istc-logo.png";
import { Link } from "react-router";
// import { useNavigate } from "react-router-dom";


// if the user is not logged in
const defaultNav = () => {

  <nav className="navbar bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/30 shadow-lg shadow-purple-500/20">
    <div className="navbar-start px-5">
      <img src={logo} alt="logo.png" className="size-8 mr-2" />
      <h1>PROJECT:ISTC</h1>
    </div>
    <div className="navbar-end">
      <ul className="menu menu-horizontal px-5 gap-1.5">
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
  </nav>;
};


// if the user is a seller
const sellerNav = () => {

  <nav className="navbar bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/30 shadow-lg shadow-purple-500/20">
      <div className="navbar-start px-5">
        <img src={logo} alt="logo.png" className="size-8 mr-2" />
        <h1>PROJECT:ISTC</h1>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-5 gap-1.5">
          <li>
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link to="/manage">
              <button>Shop</button>
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <button>Orders</button>
            </Link>
          </li>
          <li>
            <button>Contact Us</button>
          </li>
          <li>
            <Link to="/cart">
              <button>Cart</button>
            </Link>
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
}

// if the user is a customer
const customerNav = () => {

  <nav className="navbar bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/30 shadow-lg shadow-purple-500/20">
      <div className="navbar-start px-5">
        <img src={logo} alt="logo.png" className="size-8 mr-2" />
        <h1>PROJECT:ISTC</h1>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-5 gap-1.5">
          <li>
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link to="/products">
              <button>Shop</button>
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <button>Orders</button>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <button>Contact Us</button>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <button>Cart</button>
            </Link>
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

    // for ts
    const user:String = ''
    if(user == "cus"){
      defaultNav
      customerNav
      sellerNav
    }
}


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
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link to="/products">
              <button>Shop</button>
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <button>Orders</button>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <button>Contact Us</button>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <button>Cart</button>
            </Link>
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
                  <Link to="/profile">
                    <button> Profile</button>
                  </Link>
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
