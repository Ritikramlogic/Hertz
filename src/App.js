import "./App.css";
import React from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import TradePage from "./pages/TradePage";
import { store } from "./Redux/store";
import InfoPage from "./pages/InfoPage";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={TradePage} />
        <Route path="/info" component={InfoPage} />
      </Switch>
      <Footer />
      <button
        onClick={() => {
          console.log(store.getState());
        }}
      >
        Click me{" "}
      </button>
    </div>
  );
}

export default App;
