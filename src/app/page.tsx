"use client";

import { useEffect, useState } from "react";

/**
 * IMPROVEMENTS:
 *  + ensure strong typing using TS
 *  + add error handling and preparation to separate components
 *  + replaced direct DOM manipulation (anti-pattern)
 *  + implmeneted consistent styling using Tailwind
 *  + applicaiton is generally cleaned up and ready for new features
 */

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

  /** as long as keys are strings, we ensure order */
  const headersMap: Record<string, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    city: "City",
    degree: "Degree",
    specialties: "Specialties",
    yearsOfExperience: "Experience",
    phoneNumber: "Phone",
  };

  /**
   * @param {string} header - The table header string
   * @returns {JSX.Element} A <th> element with the header string
   */
  const tableHeaderCell = (header: string): JSX.Element => (
    <th key={header} className="border border-gray-300 px-4 py-2">
      {header}
    </th>
  );

  /**
   * Creates a <td> element with the value of the given advocate and key.
   * @param {Advocate} advocate - The advocate object
   * @param {keyof Advocate} key - The key of the advocate object
   * @returns {JSX.Element} A <td> element with the value of the given advocate and key
   */
  const tableDataCell = (
    advocate: Advocate,
    key: keyof Advocate
  ): JSX.Element => {
    const cellValue = advocate[key];
    return (
      <td
        key={`${advocate.id}-${key}`}
        className="border border-gray-300 px-4 py-2"
      >
        {Array.isArray(cellValue) ? cellValue.join(", ") : cellValue}
      </td>
    );
  };

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
            Replace this with an error handling class and graceful degredation
          </p>
          <p>{error}</p>
        </div>
      )}

      {/* ADVOCATES TABLE (will be own component) */}
      <table className="w-full table-auto border-collapse border border-gray-400 shadow-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {Object.values(headersMap).map((header) => {
              return tableHeaderCell(header);
            })}
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                {Object.keys(headersMap).map((headerKey) =>
                  tableDataCell(advocate, headerKey as keyof Advocate)
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
