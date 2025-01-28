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

  useEffect(() => {
    const fetchAdvocates = async () => {
      console.log("SEARCH TERM", searchTerm);
      try {
        const response = await fetch(
          `/api/advocates?search=${searchTerm}&page=${currentPage}`
        );
        if (!response.ok) throw new Error("Failed to fetch advocates");
        const data = await response.json();
        setAdvocates(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdvocates();
  }, [searchTerm, currentPage]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {advocates.map((advocate) => (
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
