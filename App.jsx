import { useEffect, useState } from "react"
import "./App.css"
/*images*/
import searchIcon from "./assets/New folder/search.png";
import clearIcon from "./assets/New folder/clear.png";
import cloudIcon from "./assets/New folder/cloud.png";
import drizzleIcon from "./assets/New folder/drizzle.png";
import rainIcon from "./assets/New folder/rain.png";
import windIcon from "./assets/New folder/wind.png";
import snowIcon from "./assets/New folder/snow.png";
import humidityIcon from "./assets/New folder/humidity.png";

const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{
  return(
    <>
  <div className="image">
    <img src={icon} alt="Image"/>
  </div>
  <div className="temp">{temp}C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className="lat">latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className="log">longitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidityIcon} alt="humidity" className="icon"/>
      <div className="data">
        <div className="humidity-percentage">{humidity}%</div>
        <div className="text">Humidity</div>
      </div>
    </div>
    <div className="element">
      <img src={windIcon} alt="wind" className="icon"/>
      <div className="data">
        <div className="wind-percentage">{wind}km/h</div>
        <div className="text">Wind speed</div>
      </div>
    </div>
  </div>
  </>
  );
};

function App() {
  let api_key="f8f82c0b68cd7307190e4f81fd3d5556";

  const[text,setText]=useState("chennai");
  const [icon,setIcon]=useState(clearIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("");
  const [country,setCountry]=useState("");
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [wind,setWind]=useState(0);
  const[citynotfound,setCitynotfound]=useState(false);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);

  const weatherIconMap={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon,
  };
  const search=async()=>{
   setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
    try{
let res=await fetch(url);
let data=await res.json();
//console.log(data);
if(data.cod==="404"){
  console.error("city not found");
  setCitynotfound(true);
  setLoading(false);
  return;
}
setHumidity(data.main.humidity);
setWind(data.wind.speed);
setTemp(Math.floor(data.main.temp));
setCity(data.name);
setCountry(data.sys.country);
setLat(data.coord.lat);
setLog(data.coord.lon);
const weatherIconCode=data.weather[0].icon;
setIcon(weatherIconMap[weatherIconCode]|| clearIcon);
setCitynotfound(false);
    }catch(error){
console.error("ana error occured:",error.message);
setError("An error occured while fetching weather data")
    }finally{
setLoading(false);
    }
  };
  const handlecity=(e)=>{
setText(e.target.value);
  };
  const handlekeydown=(e)=>{
if(e.key==="Enter"){
  search();
}
  };

  useEffect(function(){
    search();
  },
[])
  return (
    <>
    <div className="container">
      <div className="input-container">
        <input type="text" className="cityinput" placeholder="searchcity" 
        onChange={handlecity} value={text} onKeyDown={handlekeydown}/>
        <div className="search-icon" onClick={()=>search()}>
          <img src={searchIcon}alt="search"/>
        </div>
      </div>
      
    {loading&&<div className="loading-message">Loading...</div>}
    {error&&<div className="error-message">{error}</div>}
    {citynotfound&&<div className="city-not-found">City not Found</div>}
    {!loading && !citynotfound &&<WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}
    <p className="copyright">
      Designed by<span>Yogalakshmi</span>
    </p>
    
    </div>
    </>
  );
}

export default App;
