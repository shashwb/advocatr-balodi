"use client";

import { useEffect, useState } from "react";
import { Advocate } from "@/types/advocates";

/** components */
import AdvocateList from "@/components/AdvocateList";
import SearchBar from "@/components/SearchBar";

/**
 * IMPROVEMENTS:
 *  + ensure strong typing using TS
 *  + add error handling and preparation to separate components
 *  + replaced direct DOM manipulation (anti-pattern)
 *  + implmeneted consistent styling using Tailwind
 *  + applicaiton is generally cleaned up and ready for new features
 */

interface AdvocateAPIResponse {
  data: Advocate[];
}

export default function Home(): JSX.Element {
  /** advocate states (initially empty, will gracefully degrade if fetch fails) */
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  /** search states */
  const [searchTerm, setSearchTerm] = useState<string>("");
  /** loading state and error handling */
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Fetches advocates from the backend API
     *
     * @returns {Promise<void>} Resolves when the fetch is complete, rejects on error
     */
    const fetchAdvocates = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      /** try / catch */
      try {
        const response = await fetch("/api/advocates");
        // const response = await fetch("/api/advocates?page=1&limit=5");

        if (!response.ok) throw new Error("Failed to fetch advocates");
        const advocates: AdvocateAPIResponse = await response.json();

        setAdvocates(advocates.data);
        setFilteredAdvocates(advocates.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvocates();
  }, []);

  /**
   * Handles changes to the search input field
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchTerm)
        )
      );
    });

    setSearchTerm(searchTerm);
    setFilteredAdvocates(filteredAdvocates);
  };

  return (
    <div className="max-w-7xl mx-auto p-2">
      {/* TITLE SECTION */}
      <h1 className="text-3xl font-extrabold mb-4">Solace Advocates Finder</h1>

      {/* SEARCH SECTION */}
      <div className="mb-7">
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
          className="w-full px-4 text-teal-800 bg-teal-50 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Search by name, city, or specialty..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <div>
          testing
          <div>
            <SearchBar />
          </div>
        </div>
      </div>

      {/* DATA SECTION */}
      {loading && <p>Loading advocates...</p>}
      {error && (
        <div className="bg-red-100 rounded-xl p-3 m-8">
          <p className="text-red-500 text-md font-bold">
            Replace this with an error handling class and graceful degredation
          </p>
          <p>{error}</p>
        </div>
      )}

      <div id="advocateListHolder" className="mx-4 p-2">
        <AdvocateList advocates={filteredAdvocates as Advocate[]} />
      </div>
    </div>
  );
}
