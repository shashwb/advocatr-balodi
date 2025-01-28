import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(() => input, 300);

  useEffect(() => {
    onSearch && onSearch(debouncedInput); // Trigger search when the debounced value changes
  }, [debouncedInput, onSearch]);

  return (
    <>
      <label
        htmlFor="searchbar"
        className="block text-md font-medium p-2 text-teal-900 dark:text-teal-300"
      >
        Search Advocates
      </label>
      <input
        id="searchbar"
        type="text"
        // lets make this look a little nicer
        className="w-full px-4 text-teal-800 bg-teal-50 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500"
        placeholder="Search by name, city, or specialty..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </>
  );
}
