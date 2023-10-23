import React, { useEffect, useState } from "react";

import "./Days.css";
import sunny from "/Images/sunny.svg"
import cloudy from "/Images/cloudy.svg"
import snowy from "/Images/snowy.svg"
import rainy from "/Images/rainy.svg"
import rainy_2 from "/Images/rainy-2.svg"
import stormy from "/Images/stormy.svg"

let picture = {
  0: sunny,
  1: cloudy,
  2: cloudy,
  3: cloudy,
  45: snowy,
  48: snowy,
  51: rainy,
  53: rainy,
  55: rainy,
  56: rainy_2,
  57: rainy_2,
  61: rainy_2,
  63: rainy_2,
  65: rainy_2,
  66: rainy_2,
  67: rainy_2,
  71: snowy,
  73: snowy,
  75: snowy,
  77: snowy,
  80: rainy_2,
  81: rainy_2,
  82: rainy_2,
  85: snowy,
  86: snowy,
  95: stormy,
  96: stormy,
  99: stormy,
};

async function getData() {
  let response = await fetch("https://ipapi.co/json/");
  let data = await response.json();

  let a = data.latitude;
  let b = data.longitude;
  console.log(a, b);

  let response2 = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=" +
      data.latitude +
      "&longitude=" +
      data.longitude +
      "&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Africa%2FCairo&forecast_days=3"
  );
  let data2 = await response2.json();

  let numImg = data2.daily.weathercode;
  let maxT = data2.daily.temperature_2m_max;
  let minT = data2.daily.temperature_2m_min;
  console.log(numImg);
  console.log(maxT);
  console.log(minT);
  console.log("asdfghgfd");

  return [numImg, maxT, minT];
}

function Days() {
  const [numImg, setNumImg] = useState([]);
  const [maxT, setMaxT] = useState([]);
  const [minT, setMinT] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const [numberImg,maxTemp, minTemp] = await getData();
      setNumImg(numberImg);
      setMaxT(maxTemp);
      setMinT(minTemp);
    }
    fetchData();
  }, []);
  console.log(numImg, maxT, minT);

  return (
    <>
      <h1>Welcome to the weather site</h1>
      <h2>The weather in your area is:</h2>
      <div class="container">
        <div class="weather-day">
          <div class="day">Today</div>
          <img src={picture[numImg[0]]} alt="" />
          <div class="temperature">
            Max: {Math.floor(maxT[0])}° Min: {Math.floor(minT[0])}°
          </div>
        </div>
        <div class="weather-day">
          <div class="day">Tomorrow</div>
          <img src={picture[numImg[1]]} alt="" />
          <div class="temperature">
            Max: {Math.floor(maxT[1])}° Min: {Math.floor(minT[1])}°
          </div>
        </div>
        <div class="weather-day">
          <div class="day">Overmorrow</div>
          <img src={picture[numImg[2]]} alt="" />
          <div class="temperature">
            Max: {Math.floor(maxT[2])}° Min: {Math.floor(minT[2])}°
          </div>
        </div>
      </div>
    </>
  );
}

export default Days;