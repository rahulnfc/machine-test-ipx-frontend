import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { useState } from "react";

const App = () => {
  const [cartCount, setCartCount] = useState(0)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home
            cartCount={cartCount}
            setCartCount={setCartCount}
          />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/cart">
          <Cart
            cartCount={cartCount}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;