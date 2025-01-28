import React, { useEffect, useState } from "react";
import AdvocateCard from "./AdvocateCard";
import { Advocate } from "@/types/advocates";

interface AdvocateListProps {
  searchTerm: string;
  currentPage: number;
}

export default function AdvocateList({
  searchTerm,
  currentPage,
}: AdvocateListProps) {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const response = await fetch(
          `/api/advocates?search=${searchTerm}&page=${currentPage}`
        );
        if (!response.ok) throw new Error("Failed to fetch advocates");
        const data = await response.json();
        setAdvocates(data.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to load advocates. Please try again.");
      }
    };

    fetchAdvocates();
  }, [searchTerm, currentPage]);

  if (error) {
    return (
      <div className="bg-red-100 rounded-xl p-3 m-8">
        <p className="text-red-500 text-md font-bold">
          Replace this with an error handling class and graceful degredation
        </p>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {advocates &&
        advocates.map((advocate) => (
          <AdvocateCard
            key={advocate.id}
            name={`${advocate.firstName} ${advocate.lastName}`}
            degree={advocate.degree}
            specialties={advocate.specialties}
            yearsOfExperience={advocate.yearsOfExperience}
            city={advocate.city}
          />
        ))}
    </div>
  );
}
