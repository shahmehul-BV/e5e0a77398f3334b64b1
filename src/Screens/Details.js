import React, { useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const API_KEY = "9b047c63c88c89b23308d110126e9ee2";

const Details = memo(() => {
  let { id } = useParams();

  const [datasource, setDatasource] = useState([]);
  const [data2, setData2] = useState("");
  const [setCapital, setSetCapital] = useState([]);

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
    Axios.get(`https://restcountries.eu/rest/v2/name/${id}`)
      .then((res) => {
        console.log("details---->", res.data[0].capital);
        setDatasource(res.data);
        setSetCapital(res.data.capital);
        console.log("datasource---->", datasource, setCapital);
      })
      .catch((err) => {
        console.log("err---->", err);
      });
  };

  const apiCall3 = () => {
    Axios.get(
      `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${id}`
    )
      .then((res) => {
        console.log("weather--->", res.data.current);
        setData2(res.data.current);
        console.log("data2--->", data2);
      })
      .catch((err) => {
        console.log("err---->", err);
      });
  };

  useEffect(() => {
    console.log("ID", id);
    console.log("object", datasource, data2, setCapital);
    apiCall2();
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
      {data2 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <div>temperature : {data2.temperature}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            weather_icons:{" "}
            <img
              src={data2.weather_icons}
              style={{ height: "50px", width: "50px" }}
            ></img>
          </div>
          <div>wind_speed: {data2.wind_speed}</div>
          <div>precip: {data2.precip}</div>
        </div>
      ) : null}
    </div>
  );
});

export default Details;
