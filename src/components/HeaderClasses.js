import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    height: "10%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    alignSelf: "center",
    textDecoration: "none",
    fontSize: "19px",
    color: "white",
  },
  button: {
    margin: "0px 10px ",
  },
}));
export default useStyles;
