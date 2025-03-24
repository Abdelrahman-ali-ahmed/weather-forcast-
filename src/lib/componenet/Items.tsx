interface ItemsProps {
    weather: string;
    temperature: number;
    day: string;
    nightMode: boolean;
  }
  
  export default function Items({ weather, temperature, day, nightMode }: ItemsProps) {
    return (
      <div className={`p-4 rounded-xl shadow-md border max-w-sm mx-auto transition-all 
        flex flex-col  items-center h-36 w-60 
        ${nightMode ? "bg-gray-200 text-black border-gray-500" : "bg-gray-900 text-white border-gray-700"}`}
      >
        <h3 className="text-xl font-semibold mb-2">{day}</h3>
        <p className="text-lg mb-2">{weather.slice(6,weather.length)}</p>
        <p className="text-2xl font-bold">{temperature}°C</p>
      </div>
    );
  }
  
  