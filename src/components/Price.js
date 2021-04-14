import React, { useState } from "react";
import useStyles from "./PriceClasses";
import moment from "moment/moment";
import { Chip } from "@material-ui/core";

const Price = (props) => {
  const { number, id, value, date, removeFromPriceArr } = props;
  const [visible, setVisible] = useState(false);
  const [focusedPriceId, setFocusedPriceId] = useState(false);
  const priceClasses = useStyles();

  return (
    <>
      <Chip
        key={id}
        label={`${number}) ${value}`}
        onDelete={() => removeFromPriceArr(id)}
        className={priceClasses.chip}
        onMouseOver={() => {
          setVisible(true);
          setFocusedPriceId(id);
        }}
        onMouseLeave={() => setVisible(false)}
      />
      {visible && focusedPriceId === id && (
        <span className={priceClasses.time}>
          {`${number}) ${value}BYN created at `}
          {moment(date).format("HH:mm:ss")}
        </span>
      )}
    </>
  );
};

export default Price;
