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
    /** fetch advocates */
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

  /** TODO:
   *  x get rid of the direct DOM manipulations and use react state instead
   *  x create a better name for this function -> handleSearch
   *  x handle filtering with better UX
   *  x handle errors
   *  - make sure it's debounced for better UX
   *  - move filtering to the backend for performance?
   */
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchTerm: string = e.target.value.toLowerCase(); // normalize this

    /** filtering code */
    const filteredAdvocates: Advocate[] = advocates.filter((advocate) => {
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

    /** set advocate states */
    setSearchTerm(searchTerm);
    setFilteredAdvocates(filteredAdvocates);
  };

  /** TODO: use tailwindcss to add a more modern design */
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
          onChange={handleSearchInput}
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
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
