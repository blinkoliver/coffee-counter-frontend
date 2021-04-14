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
        <Route path={"/"} exact={true} component={Home} />
        <Route path={"/counter"} component={Counter} />
      </main>
      <Footer />
    </>
  );
};

export default App;
