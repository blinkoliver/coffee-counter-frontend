import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "./HomeClasses";
const Home = () => {
  const homeClasses = useStyles();
  const [joke, setJoke] = useState("");
  const [punchLine, setPunchLine] = useState("");
  const getJoke = async () => {
    let response = await fetch("https://dad-jokes.p.rapidapi.com/random/joke", {
      method: "GET",
      accept: "application/json",
      headers: {
        "x-rapidapi-key": "c5f59aed56msha0b3905c5c63c34p1881acjsna698220a9cf2",
        "x-rapidapi-host": "dad-jokes.p.rapidapi.com",
      },
    });
    let result = await response.json();
    setJoke(result.body[0].setup);
    setPunchLine(result.body[0].punchline);
  };
  useEffect(() => {
    getJoke();
  }, []);
  return (
    <Grid container className={homeClasses.root}>
      <Grid item xs={12} sm={12} md={12} className={homeClasses.image}>
        <div className={homeClasses.title}>
          <Typography
            component="h4"
            variant="h6"
            className={homeClasses.typography}
          >
            {joke}
          </Typography>
          <Typography
            component="h4"
            variant="h6"
            className={homeClasses.typography}
          >
            {punchLine}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;
