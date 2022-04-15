import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import BuyerHome from "./components/common/BuyerHome";
import VendorHome from "./components/common/VendorHome";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import BuyerNavbar from "./components/templates/BuyerNavbar";
import VendorNavbar from "./components/templates/VendorNavbar";
import BuyerProfile from "./components/users/BuyerProfile";
import VendorProfile from "./components/users/VendorProfile";
import VendorFood from "./components/users/Vendorfood";
import AddItem from "./components/users/AddItem";
import Addwallet from "./components/users/Addwallet";
import Buyeritemslist from "./components/users/Buyeritemslist";
import Favourites from "./components/users/Favourites";
import Myorders from "./components/users/Myorders";
import Vendororders from "./components/users/Vendororders";
import Statisticspage from "./components/users/Statisticspage";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const BuyerLayout = () => {
  return (
    <div>
      <BuyerNavbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
const VendorLayout = () => {
  return (
    <div>
      <VendorNavbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/" element={<BuyerLayout />}>
          <Route path="buyerhome" element={<BuyerHome />} />
          <Route path="buyerprofile" element={<BuyerProfile />} />
          <Route path="buyeritemslist" element={<Buyeritemslist />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="myorders" element={<Myorders />} />
          <Route path="addwallet" element={<Addwallet />} />
        </Route>
        <Route path="/" element={<VendorLayout />}>
          <Route path="vendorhome" element={<VendorHome />} />
          <Route path="vendorprofile" element={<VendorProfile />} />
          <Route path="vendorfood" element={<VendorFood />} />
          <Route path="additems" element={<AddItem />} />
          <Route path="vendororders" element={<Vendororders />} />
          <Route path="statisticspage" element={<Statisticspage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
