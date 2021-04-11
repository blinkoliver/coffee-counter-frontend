import React from "react";
import Counter from "./components/Counter";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Route path={"/coffe-counter/counter"} component={Counter} />
        <Route path={"/coffe-counter"} exact={true} component={Home} />
      </main>
      <Footer />
    </>
  );
};

export default App;
