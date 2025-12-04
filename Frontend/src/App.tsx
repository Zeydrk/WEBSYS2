// styles and libraries
import './App.css';

// components
import Navbar from './components/Navbar';
import Products from './components/Products';
import ProductPage from './components/ProductPage';
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
          <Route path='/' element= {<Products/>}></Route>
          <Route path='/product' element={<ProductPage/>}></Route>
        </Routes>
      </Router>
      {/* <RouterProvider router={router} /> */}
    </>
  );
}

export default App;
