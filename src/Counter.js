import React from "react";
import "./App.css";
import { getSum, Fetch } from "./utils";
import moment from "moment/moment";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 0,
      prices: [],
      priceSum: null,
      visible: false,
      focusedPriceId: null
    };
  }

  componentDidMount() {
    this.fetchPrices();
  }
  
  fetchPrices() {
    Fetch(`http://localhost:3000/prices/allToday`)
      .then((get) => {
        this.setState({ prices: get });
      });
  }

  handleInput = (event) => {
    let newValue = event.target.value;
    if (newValue.length === 1) {
      newValue = "0" + newValue;
    }
    const formatedValue = parseFloat(
      newValue.replace(/[^\d]/g, "").replace(/(\d\d?)$/, ".$1")
    ).toFixed(2);
    this.setState({ inputValue: formatedValue });
  };

  handleKeyDown = (e) => {
    const { prices, inputValue } = this.state;
    if (e.key === "Enter" || e.key === " ") {
      Fetch(`http://localhost:3000/prices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          price: parseFloat(inputValue)
        })
      })        .then((information) => {
          this.setState({ prices: [...prices, information] });
        });
      this.setState({ inputValue: 0 });
    }
  };

  removeFromPriceArr = (_id) => {
    const { prices } = this.state;
    fetch(`http://localhost:3000/prices/${_id}`, {
      method: "DELETE"
    }).then(() => {
      const updatePrices = prices.filter((element) => element._id !== _id);
      this.setState({ prices: updatePrices });
    });
  };

  render() {
    return (
      <div className="App">
        <div className="CashArr">
          {this.state.prices.map((el, index) => (
            <div
              key={el._id}
              onMouseOver={() => {
                this.setState({ visible: true });
                this.setState({ focusedPriceId: el._id });
              }}
              onMouseLeave={() => this.setState({ visible: false })}
            >
              <span>{index + 1})</span>
              <span>{el.price}</span>
              {(this.state.visible && this.state.focusedPriceId===el._id)&&(
                <span>
                  <button onClick={() => this.removeFromPriceArr(el._id)}>
                    <span>X</span>
                  </button>
                  <span>{moment(el.date).format("HH:mm:ss")}</span>
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="Sum">
          <input
            autoFocus
            type="number"
            value={this.state.inputValue}
            onChange={(event) => this.handleInput(event)}
            onKeyDown={this.handleKeyDown}
          ></input>
          <h1>{getSum(this.state.prices)}BYN</h1>
        </div>
      </div>
    );
  }
}
export default Counter;
