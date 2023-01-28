import OrdersList from "./pages/OrdersList";
import Order from "./pages/Order";
import ContentMain from "./components/Content";
import AddOrder from "./pages/AddOrder";
import Products from "./pages/Products";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<ContentMain  />}>
              <Route index  element={<OrdersList />} />
              <Route path="order/:productID" element={<Order />} />
              <Route path="order/:productID/products" element={<Products />} />
              <Route path="add" element={<AddOrder />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
