import React from "react";
import { Container, Typography } from "@material-ui/core";
import useStyles from "./FooterClasses";

const Footer = () => {
  const footerClasses = useStyles();
  const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center" className={footerClasses.title}>
        {"Copyright © "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };
  return (
    <footer className={footerClasses.footer}>
      <Container className={footerClasses.footerContainer} maxWidth="sm">
        <Copyright />
      </Container>
    </footer>
  );
};
export default Footer;
