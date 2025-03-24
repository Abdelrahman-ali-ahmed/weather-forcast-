export interface MainItemProps {
    weather: any;
    currentWeather: any;
    nightMode: boolean;
  }
  
  export default function MainItem({ weather, currentWeather, nightMode }: MainItemProps) {
    const data = weather?.current_weather; 
  
    console.log("Received Weather Data:", currentWeather?.[0]?.des?.slice(5,currentWeather?.[0]?.des.length));
  
    if (!data) {
      return <p className="text-gray-500">No weather data available.</p>;
    }
    const formattedTime = new Date(Date.parse(data.time)).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, 
    });
  
    return (
      <div className={`w-fit h-fit p-4 border border-gray-300 rounded-lg shadow-lg max-w-lg mx-auto
        ${nightMode ? "bg-white text-black" : "bg-gray-900 text-white"}`} 
      >
        <div className=" p-5 w-full flex justify-between "><img className="w-20 h-20" src={currentWeather?.[0].image} alt="" />
        <div className="ml-4">
        <p className="text-4xl mb-4"> {data.temperature}°C</p>
        <p className=" w-50 h-fit text-lg">{formattedTime}</p>
           </div>
         </div>
       
        <div className="w-full flex flex-row justify-around">
        <p className="text-2lx"> {currentWeather?.[0]?.des?.slice(6,currentWeather?.[0]?.des.length)}</p>
        <p className="text-2lx"> {data.windspeed} km/h</p>
        <p className="text-2lx"> {data.winddirection}°</p> </div>
        
      </div>
    );
  }
  