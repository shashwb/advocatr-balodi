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
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input
          id="searchbar"
          type="text"
          placeholder="Search by name, city, or specialty..."
          value={searchTerm}
          style={{ border: "1px solid black" }}
          onChange={handleSearchInput}
        />
      </div>
      <br />
      <br />

      {loading && <p>Loading...</p>}
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
    </main>
  );
}
