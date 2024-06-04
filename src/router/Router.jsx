import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import Maintenance from "../components/Maintenance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu/>,
      },
      {
        path: "/cart-page",
        element: <CartPage />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile/>
      }
    ],
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  
  {
    path: "/maintenance",
    element: <Maintenance />
  }

]);

export default router;
