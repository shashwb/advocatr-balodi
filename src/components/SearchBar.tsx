import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    console.log("onSearch!, input", input);
    onSearch(debouncedInput);
  }, [debouncedInput, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search advocates..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  );
}
