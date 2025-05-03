import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const ROOM_MAP = [
  { id: 'daedalus_lounge', name: 'Daedalus Lounge', floor: '3rd Floor' },
  { id: 'east_library', name: 'East Library', floor: '2nd Floor' },
  { id: 'west_lobby', name: 'West 3rd Floor Lobby', floor: '3rd Floor' }
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof ROOM_MAP>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);

    // Filter suggestions based on input
    const filtered = ROOM_MAP.filter(room =>
      room.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(value ? filtered : []);
  };

  const handleSuggestionClick = (room: typeof ROOM_MAP[0]) => {
    setSearchTerm(room.name);
    onSearch(room.name);
    setSuggestions([]);
  };

  return (
    <div className="max-w-md mx-auto mt-4 mb-8">
      <div className="relative">
        <div 
          className={`relative flex items-center transition-all duration-300 
                     ${isFocused ? 'transform scale-105' : ''}`}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => {
              setIsFocused(false);
              setSuggestions([]);
            }, 200)}
            placeholder="Search for rooms..."
            className="w-full px-4 py-3 pl-12 text-gray-700 bg-white 
                     border-2 border-gray-200 rounded-full
                     focus:outline-none focus:border-blue-500 
                     focus:ring-2 focus:ring-blue-200 
                     transition-all duration-300 
                     shadow-sm hover:shadow-md"
          />
          <div className={`absolute left-4 transition-all duration-300 
                        ${isFocused ? 'text-blue-500' : 'text-gray-400'}`}>
            <FaSearch size={18} />
          </div>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                onSearch('');
                setSuggestions([]);
              }}
              className="absolute right-4 text-gray-400 hover:text-gray-600
                       transition-colors duration-200"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg 
                        border border-gray-200 z-50">
            {suggestions.map((room) => (
              <button
                key={room.id}
                onClick={() => handleSuggestionClick(room)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50
                         transition-colors duration-150 flex justify-between
                         items-center"
              >
                <span className="font-medium text-gray-700">{room.name}</span>
                <span className="text-sm text-gray-500">{room.floor}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;