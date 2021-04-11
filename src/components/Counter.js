import React, { useState, useEffect } from "react";
import { getSum } from "../utils";
import useStyles from "./CounterClasses";
import { LinearProgress } from "@material-ui/core";
import Price from "./Price";
import "../App.css";

const url =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_LOCAL_URL
    : process.env.REACT_APP_API_URL;

const Counter = () => {
  const [inputValue, setInputValue] = useState();
  const [prices, setPrices] = useState([]);

  const [isPricesFetching, setIsPricesFetching] = useState(false);
  const counterClasses = useStyles();

  const fetchPrices = () => {
    setIsPricesFetching(true);
    fetch(`${url}/prices/allToday`)
      .then((response) => response.json())
      .then((result) => {
        setPrices(result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsPricesFetching(false);
      });
  };

  const handleInput = (event) => {
    let newValue = event.target.value;
    if (newValue.length === 1) {
      newValue = "0" + newValue;
    }
    const formatedValue = parseFloat(
      newValue.replace(/[^\d]/g, "").replace(/(\d\d?)$/, ".$1")
    ).toFixed(2);
    setInputValue(formatedValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      fetch(`${url}/prices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: parseFloat(inputValue),
        }),
      })
        .then((response) => response.json())
        .then((information) => {
          setPrices([...prices, information]);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setInputValue(0);
        });
    }
  };

  const removeFromPriceArr = (_id) => {
    fetch(`${url}/prices/${_id}`, {
      method: "DELETE",
    }).then(() => {
      const updatePrices = prices.filter((element) => element._id !== _id);
      setPrices(updatePrices);
    });
  };
  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <>
      {isPricesFetching ? <LinearProgress /> : <></>}
      <div className={counterClasses.container}>
        <div className={counterClasses.prices}>
          {prices.map((el, index) => (
            <Price
              number={index + 1}
              _id={el._id}
              price={el.price}
              date={el.date}
              removeFromPriceArr={removeFromPriceArr}
            />
          ))}
        </div>
        <div className={counterClasses.revenu}>
          <input
            autoFocus
            className={counterClasses.input}
            type="number"
            value={inputValue}
            onChange={(event) => handleInput(event)}
            onKeyDown={handleKeyDown}
          ></input>
          <h2>{getSum(prices)}BYN</h2>
        </div>
      </div>
    </>
  );
};

export default Counter;
