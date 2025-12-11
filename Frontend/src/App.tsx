// styles and libraries
import './App.css';

// updateters

// components
import Navbar from './components/Navbar';
import Products from './components/Products';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Home from './components/Home';
import Orders from './components/Orders';
import Manage from './components/Manage';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Register from './components/Register';
import SellerOrders from './components/SellerOrders';
import Login from './components/Login';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// let router = createBrowserRouter([
//   {
//     path: "/",
//     Component: Products,
//   },
//   {
//     path: "/products",
//     Component: ProductPage
//   }
// ]);

function App() {
  return (
    <>
      <Router>
        <Navbar />  
        <Routes>
          <Route path='/' element= {<Home/>}></Route>
          <Route path='/products' element= {<Products/>}></Route>
          <Route path='/products/:id' element={<ProductPage/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/manage' element={<Manage/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element = {<Login/>}></Route>
          <Route path="/sellerOrder" element={<SellerOrders/>}></Route>
          <Route path='*' element= {<h1 className='text-center mt-20 text-3xl'>404 - Page Not Found</h1>}></Route>
        </Routes>
      </Router>
      {/* <RouterProvider router={router} /> */}
    </>
  );
}

export default App;
