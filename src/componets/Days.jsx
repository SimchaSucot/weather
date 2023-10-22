import "./Days.css";

let picture = {
  0: "sunny.svg",
  1: "cloudy.svg",
  2: "cloudy.svg",
  3: "cloudy.svg",
  45: "snowy.svg",
  48: "snowy.svg",
  51: "rainy.svg",
  53: "rainy.svg",
  55: "rainy.svg",
  56: "rainy-2.svg",
  57: "rainy-2.svg",
  61: "rainy-2.svg",
  63: "rainy-2.svg",
  65: "rainy-2.svg",
  66: "rainy-2.svg",
  67: "rainy-2.svg",
  71: "snowy.svg",
  73: "snowy.svg",
  75: "snowy.svg",
  77: "snowy.svg",
  80: "rainy-2.svg",
  81: "rainy-2.svg",
  82: "rainy-2.svg",
  85: "snowy.svg",
  86: "snowy.svg",
  95: "stormy.svg",
  96: "stormy.svg",
  99: "stormy.svg",
};

async function getData() {
  let response = await fetch("https://ipapi.co/json/");
  let data = await response.json();
  let response2 = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=" +
      data.latitude +
      "&longitude=" +
      data.longitude +
      "&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Africa%2FCairo&forecast_days=3"
  );

  let data2 = await response.json();

  let numImg = data2.daily.weathercode;
  let maxT = data2.daily.temperature_2m_max;
  let minT = data2.daily.temperature_2m_min;

  return numImg,maxT,minT;
}

let data = getData();

function Days(data){
  let numImg = data[0]
  let maxT = data[1]
  let minT = data[2]

  return (
    <>
      <h1>Welcome to the weather site</h1>
      <h2>The weather in your area is:</h2>
      <div class="container">
        <div class="weather-day">
          <div class="day">Today</div>
          <img src={"/Images/" + picture[numImg[0]]} alt="" />
          <div class="temperature">
            Max:{Math.floor(maxT[0])}° Min:{Math.floor(minT[0])}°
          </div>
        </div>
        <div class="weather-day">
          <div class="day">Tomorrow</div>
          <img src={"/Images/" + picture[numImg[1]]} alt="" />
          <div class="temperature">
            Max:{Math.floor(maxT[1])}° Min:{Math.floor(minT[1])}°
          </div>
        </div>
        <div class="weather-day">
          <div class="day">Overmorrow</div>
          <img src={"/Images/" + picture[numImg[0]]} alt="" />
          <div class="temperature">
            Max:{Math.floor(maxT[2])}° Min:{Math.floor(minT[2])}°
          </div>
        </div>
      </div>
    </>
  );
}
export default Days(data);
