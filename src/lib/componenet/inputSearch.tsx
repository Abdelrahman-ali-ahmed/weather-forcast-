export type SearchProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  OnClick: () => Promise<void>;
  nightMode: boolean; 
};

export default function InputSearch({ search, setSearch, OnClick, nightMode }: SearchProps) {
  return (
    <div className="flex items-center space-x-2 justify-between">
     <input
  className={`w-60 h-9 p-2 rounded-lg border focus:outline-none focus:ring-2 
    ${nightMode ? "bg-gray-800 text-white border-gray-600 focus:ring-yellow-500" 
                : "bg-white text-black border-gray-300 focus:ring-blue-500"}`}
  placeholder="Search for a city..."
  onChange={(e) => setSearch(e.target.value)}
  value={search}
/>
      <button
        onClick={OnClick}
        className={`px-4 py-2 rounded-lg transition-all 
          ${nightMode ? "bg-yellow-500 hover:bg-yellow-600 text-black" 
                      : "bg-blue-600 hover:bg-blue-800 text-white"}`}
      >
        Search
      </button>
    </div>
  );
}
