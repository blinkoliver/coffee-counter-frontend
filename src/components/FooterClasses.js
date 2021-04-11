import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: 0,
    backgroundColor: theme.palette.primary.main,
    height: "10%",
    display: "flex",
    alignItems: "center",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    margin: "0 auto",
  },
}));
export default useStyles;
