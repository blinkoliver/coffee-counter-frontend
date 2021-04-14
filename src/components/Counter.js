import React, { useState, useEffect } from "react";
import { getSum } from "../utils";
import useStyles from "./CounterClasses";
import { LinearProgress } from "@material-ui/core";
import Price from "./Price";
import { v4 as uuid } from "uuid";
import moment from "moment";
import "../App.css";
import { SnackbarProvider, useSnackbar } from "notistack";

const url =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_LOCAL_URL
    : process.env.REACT_APP_API_URL;

const Counter = () => {
  const [inputValue, setInputValue] = useState();
  const [price, setPrice] = useState();
  const [prices, setPrices] = useState([]);
  const [isPricesFetching, setIsPricesFetching] = useState(false);
  const [isPriceFetching, setIsPriceFetching] = useState(false);
  const counterClasses = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const showErrorSnack = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };
  const showSuccessSnack = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  const fetchPrices = () => {
    setIsPricesFetching(true);
    fetch(`${url}/prices/allToday`)
      .then((response) => response.json())
      .then((result) => {
        setPrices(result);
        showSuccessSnack("success, correct fetching", "success");
      })
      .catch((error) => {
        console.log(error);
        showErrorSnack(
          "error, failed fetching, check internet connection",
          "error"
        );
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
    setPrice({
      id: uuid(),
      value: parseFloat(formatedValue),
      date: moment.utc()._d,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      setPrices([...prices, price]);
      setIsPriceFetching(true);
      fetch(`${url}/prices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(price),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            showSuccessSnack("success, correct adding", "success");
          }
        })
        .catch(() => {
          setPrices(prices.filter((el) => el.id !== price.id));
          showErrorSnack(
            "error, failed adding, check internet connection",
            "error"
          );
        })
        .finally(() => {
          setIsPriceFetching(false);
          setInputValue(0);
        });
    }
  };

  const removeFromPriceArr = (id) => {
    setIsPriceFetching(true);
    fetch(`${url}/prices/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setPrices(prices.filter((element) => element.id !== id));
        showSuccessSnack("success, correct deleting", "success");
      })
      .catch(() => {
        showErrorSnack(
          "error, failed deleting, check internet connection",
          "error"
        );
      })
      .then(() => setIsPriceFetching(false));
  };

  useEffect(() => {
    fetchPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isPricesFetching ? <LinearProgress /> : <></>}
      <div className={counterClasses.container}>
        <div className={counterClasses.prices}>
          {prices.map((el, index) => (
            <Price
              key={el.id}
              number={index + 1}
              id={el.id}
              value={el.value}
              date={el.date}
              removeFromPriceArr={removeFromPriceArr}
              isPriceFetching={isPriceFetching}
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

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Counter />
    </SnackbarProvider>
  );
}
