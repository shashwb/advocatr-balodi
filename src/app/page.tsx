"use client";

import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import AdvocateList from "../components/AdvocateList";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Handles changing the page.
   * @param newPage The new page number to load.
   */
  const handlePageChange = (newPage: number) => {
    if (newPage > 0) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Find Your Advocate</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar onSearch={setSearchTerm} />
      </div>

      {/* Advocates List with Pagination */}
      <AdvocateList searchTerm={searchTerm} currentPage={currentPage} />

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
