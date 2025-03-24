import { useDispatch, useSelector } from "react-redux";
import InputSearch, { SearchProps } from "./inputSearch";
import { AppDispatch, RootState } from "../store";
import { toggleNightMode } from "../../pages/introPage/redux/weatherSlice";

export default function Header({ search, setSearch, OnClick }: SearchProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { nightMode } = useSelector((state: RootState) => state.weather);

  return (  
    <div className="flex flex-col md:flex-row w-full fixed top-0 left-0 justify-between items-center py-4 px-6 bg-opacity-90 z-10">

      <div className="flex justify-between w-full md:w-auto items-center">
        <h1 className={`text-3xl font-bold ${nightMode ? "text-black" : "text-white"}`}>
          Weather Forecast
        </h1>
        <button className="p-3 rounded-lg ml-4 md:ml-0" onClick={() => dispatch(toggleNightMode())}>
          <img
            src={!nightMode ? "/assets/day-mode.png" : "/assets/sleep-mode.png"}
            alt="Mode Icon"
            className="w-8 h-8"
          />
        </button>
      </div>
      <div className="w-full md:w-auto mt-4 md:mt-0">
        <InputSearch setSearch={setSearch} search={search} OnClick={OnClick} nightMode={nightMode} />
      </div>
    </div>
  );
}
