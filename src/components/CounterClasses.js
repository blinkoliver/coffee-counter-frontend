import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.text.disabled,
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  prices: {
    width: "80%",
    padding: "10px",
  },
  revenu: {
    width: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  },
  input: {
    width: "100%",
    height: "50px",
    borderRadius: "15px",
    borderWidth: "0px",
    fontSize: "50px",
    textAlign: "center",
    outline: "none",
    padding: "10px 0px 10px 0px",
    marginRight: "15px",
  },
}));
export default useStyles;
