"use client";

import { useEffect, useState } from "react";

/** typescript interface for Advocate / type safety */
interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

interface AdvocateAPIResponse {
  data: Advocate[];
}

export default function Home() {
  /** advocate states (initially empty, will gracefully degrade if fetch fails) */
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  /** search states */
  const [searchTerm, setSearchTerm] = useState<string>("");
  /** loading state and error handling */
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /** initial default fetch -> get advocates from the backend */
  /** TODO:
   * create a dedicated fetch function to run async
   * x use async/awaitd
   * x handle errors
   * x handle loading
   * - eventually we will have pagination to prepare for large data (scaling)
   */
  useEffect(() => {
    /**
     * Fetches advocates from the backend API
     *
     * @param {void} No arguments
     * @returns {Promise<void>} Resolves when the fetch is complete, rejects on error
     */
    const fetchAdvocates = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      /** try / catch */
      try {
        const response = await fetch("/api/advocates");
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

  /** strings are in order */
  const headersMap = {
    firstName: "First Name",
    lastName: "Last Name",
    city: "City",
    degree: "Degree",
    specialties: "Specialties",
    yearsOfExperience: "Experience",
    phoneNumber: "Phone",
  };

  const tableHeaderCell = (header: string) => (
    <th key={header} className="border border-gray-300 px-4 py-2">
      {header}
    </th>
  );

  const tableDataCell = (advocate: Advocate, key: string) => {
    const cellValue = advocate[key as keyof Advocate];
    return (
      <td key={advocate.id} className="border border-gray-300 px-4 py-2">
        {Array.isArray(cellValue) ? cellValue.join(", ") : cellValue}
      </td>
    );
  };

  /** TODO:
   * - use tailwindcss to add a more modern design
   * - create new components for each section
   */
  return (
    <div className="max-w-7xl mx-auto p-2">
      {/* TITLE SECTION */}
      <h1 className="text-2xl font-bold mb-6">Solace Advocates</h1>

      {/* SEARCH SECTION */}
      <div className="mb-10">
        <label
          htmlFor="searchbar"
          className="block text-sm font-medium text-gray-700"
        >
          Search Advocates
        </label>
        <input
          id="searchbar"
          type="text"
          // lets make this look a little nicer
          className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Search by name, city, or specialty..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </div>

      {/* DATA SECTION */}
      {loading && <p>Loading advocates...</p>}
      {error && (
        <div className="bg-red-100 rounded-xl p-3 m-8">
          <p className="text-red-500 text-md font-bold">
            TODO: Replace this with an error handling class and graceful
            degredation: {error}
          </p>
        </div>
      )}

      {/* ADVOCATES TABLE (will be own component) */}
      <table className="w-full table-auto border-collapse border border-gray-400 shadow-sm">
        <thead className="bg-gray-100 text-gray-700">
          {Object.values(headersMap).map((header) => {
            return tableHeaderCell(header);
          })}
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                {Object.keys(headersMap).map((headerKey) =>
                  tableDataCell(advocate, headerKey)
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
