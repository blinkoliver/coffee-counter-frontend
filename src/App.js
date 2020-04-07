import React from "react";
import "./App.css";
import Counter from "../src/Counter";
import Loading from "../src/Loading";
import { useState } from "react";

const App = (props) => {
  const [loading] = useState(false);

  return <div>{loading ? <Loading /> : <Counter />}</div>;
};

export default App;
