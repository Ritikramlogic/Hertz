import "./App.css";
import React from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import TradePage from "./pages/TradePage";
import { store } from "./Redux/store";

function App() {
  return (
    <div className="App">
      <Header />
      <TradePage />
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
