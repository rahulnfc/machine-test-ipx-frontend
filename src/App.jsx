import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { useState } from "react";
import { UserContext } from "./context/usercontext";

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [userData, setUserData] = useState({});
  const [products, setProducts] = useState([]);
  const [logined, setLogined] = useState(true)
  const [search, setSearch] = useState('')
  const [cartProducts, setCartProducts] = useState([]);
  return (
    <UserContext.Provider value={{
      cartCount, setCartCount,
      userData, setUserData,
      products, setProducts,
      logined, setLogined,
      search, setSearch,
      cartProducts, setCartProducts
    }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;