import List from "./Components/List/list";
import Navbar from "./Components/Navbar/navbar";
import Cart from "./Components/Cart/cartList";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<List />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </>
  );
}

export default App;
