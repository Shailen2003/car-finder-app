import { useState } from 'react';

export default function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Car Finder</h1>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 rounded">
          Search
        </button>
      </div>
    </nav>
  );
}
