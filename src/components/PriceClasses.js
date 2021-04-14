import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  price: {
    display: "flex",
  },
  chip: {
    margin: theme.spacing(0.5),
    width: "fit-content",
  },
  time: {
    fontSize: "large",
    position: "absolute",
    color: "white",
    bottom: "25px",
    right: "25px",
  },
}));
export default useStyles;
