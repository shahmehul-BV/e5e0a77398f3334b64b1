import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const API_KEY = "f65d8f01b96f3adfd3438a754e93d219";

const Details = () => {
  let { id } = useParams();

  const [datasource, setDatasource] = useState([]);
  const [data2, setData2] = useState([]);

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
      width: "25%",
    },
  }));

  const apiCall2 = () => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${id}`)
      .then((res) => {
        console.log("details---->", res.data[0].capital);
        setDatasource(res.data);
        console.log("datasource---->", datasource);
      })
      .catch((err) => {
        console.log("err---->", err);
      });
  };

  const apiCall3 = () => {
    axios
      .get(
        `http://api.weatherstack.com/current? access_key=${{
          API_KEY,
        }}&query = ${id}`
      )
      .then((res) => {
        console.log("weather--->", res);
        setData2(res);
      })
      .catch((err) => {
        console.log("err---->", err);
      });
  };

  useEffect(() => {
    apiCall2();
    apiCall3();
  }, []);
  const classes = useStyles();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {datasource.map((item) => (
        <>
          <div>Capital: {item.capital}</div>
          <div>Population: {item.population}</div>
          <div>
            latlng: {item.latlng[0]}
            {item.latlng[1]}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            flag:{" "}
            <img
              src={item.flag}
              style={{ height: "50px", width: "50px" }}
            ></img>
          </div>
        </>
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          className={classes.btn}
          //  disabled={isDisabled}
          onClick={() => apiCall3()}
        >
          Capital Weather
        </Button>
      </div>
    </div>
  );
};

export default Details;
