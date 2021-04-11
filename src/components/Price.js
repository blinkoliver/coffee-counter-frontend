import React, { useState } from "react";
import useStyles from "./PriceClasses";
import moment from "moment/moment";

const Price = (props) => {
  const { number, _id, price, date, removeFromPriceArr } = props;
  const [visible, setVisible] = useState(false);
  const [focusedPriceId, setFocusedPriceId] = useState(false);
  const priceClasses = useStyles();
  return (
    <div
      key={_id}
      className={priceClasses.price}
      onMouseOver={() => {
        setVisible(true);
        setFocusedPriceId(_id);
      }}
      onMouseLeave={() => setVisible(false)}
    >
      <span>{number}</span>
      {") "}
      <span>{price}</span>
      {visible && focusedPriceId === _id && (
        <span>
          <button onClick={() => removeFromPriceArr(_id)}>
            <span>X</span>
          </button>
          <span>{moment(date).format("HH:mm:ss")}</span>
        </span>
      )}
    </div>
  );
};

export default Price;
