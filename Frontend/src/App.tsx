import React from 'react';
import logo from './logo.svg';
import './App.css';
import './output.css';
import Products from './components/Products';

// components
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Products />
    </>
  );
}

export default App;
