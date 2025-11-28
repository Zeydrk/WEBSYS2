import React from 'react';
import logo from './logo.svg';
import './App.css';
import './output.css';

// components
import Navbar from './components/Navbar';
import Products from './components/Products';
import ProductPage from './components/ProductPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

let router = createBrowserRouter([
  {
    path: "/",
    Component: Products,
  },
  {
    path: "products",
    Component: ProductPage
  }
]);

function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
