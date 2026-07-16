import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";

import { Home } from "./page/home/Home";
import { NavBar } from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import { About } from "./page/about/About";
import { Pricing } from "./page/pricing/Pricing";
import { Product } from "./page/product/Product";
import { Support } from "./page/support/Support";
import { Signup } from "./page/signup/Signup";
import { PageNotFound } from "./components/layout/PageNotFound";
import { Login } from "./components/UI/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/pricing" element={<Pricing/>} />
          <Route path="/pricing/tab-equity" element={<Pricing/>} />
          <Route path="/products" element={<Product/>} />
          <Route path="/support" element={<Support/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/*" element={<PageNotFound/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
