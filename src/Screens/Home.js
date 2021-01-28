import React, { useState, memo } from "react";
import "./home.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      display: "flex",
      flexDirection: "column",
    },
  },
  btn: {
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Home = memo(() => {
  const history = useHistory();
  const [data1, setData1] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    setData1(event.target.value);
    if (event.target.value !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const apiCall1 = () => {
    console.log("input--->,", data1);
    axios
      .get(`https://restcountries.eu/rest/v2/name/${data1}`)
      .then((res) => {
        console.log("res---->", res);
        setResponse(res);
        history.push(`./details/${data1}`);
      })
      .catch((err) => {
        console.log("err---->", err);
      });
  };

  const classes = useStyles();
  return (
    <div className={"row-view"}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Enter country"
          variant="outlined"
          onChange={(e) => handleChange(e)}
        />
        <Button
          color="secondary"
          variant="contained"
          className={classes.btn}
          disabled={isDisabled}
          onClick={() => apiCall1()}
        >
          Submit
        </Button>
      </form>
    </div>
  );
});

export default Home;
