import Header from "../../lib/componenet/Header";
import Items from "../../lib/componenet/Items";
import Loader from "../../lib/componenet/Loader";
import Loader2 from "../../lib/componenet/Loader2";
import MainItem from "../../lib/componenet/MainItem";
import useWeather from "./func/useWeather";

export default function Main() {
  const { city, setCity, fetchCityCoordinates, weather, status, error, getWeatherSummary, nightMode } = useWeather();
  const data = getWeatherSummary();
  console.log(nightMode);

  return (
    <div className={`flex flex-col min-h-screen w-full p-4 transition-all 
      ${nightMode ? "bg-white text-black" : "bg-black text-white"}`}
    >
    
      <Header search={city} setSearch={setCity} OnClick={fetchCityCoordinates} nightMode={nightMode} />
      
      <div className="mt-35 md:mt-24 flex flex-col items-center justify-center pb-10">
        {status === "loading" && (
          <div className="w-full h-full flex justify-center items-center">

            {!nightMode?<Loader />:<Loader2/>}
          </div>
        )}
        {status === "failed" && <p className="text-red-500">Error: {error}</p>}

        {status === "succeeded" && weather && (
          <div className="w-full flex flex-col items-center gap-4">
            <MainItem weather={weather} currentWeather={data} nightMode={nightMode} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
            {weather.daily.temperature_2m_max.slice(1).map((temp, index) => {
  const weatherInfo = data[index + 1];
  const weatherDescription = typeof weatherInfo === "string" ? weatherInfo : weatherInfo?.des;

  return (
    <Items
      nightMode={nightMode}
      key={index}
      temperature={temp}
      day={weather?.daily?.time[index + 1]}
      weather={weatherDescription || "No data"}
    />
  );
})}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


