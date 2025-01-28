import React from "react";
import AdvocateCard from "./AdvocateCard";

/** type interface */
import { Advocate } from "@/types/advocates";
/** create a type interface */

interface AdvocateListProps {
  advocates: Advocate[];
}

/**
 * A functional component that renders a list of AdvocateCard components.
 *
 * @returns A JSX.Element representing the AdvocateList component.
 */
const AdvocateList = ({ advocates }: AdvocateListProps): JSX.Element => {
  console.log("<AdvocateList :: advocate", advocates);
  return (
    <>
      <div>
        <h1>Advocate List!</h1>
        {advocates &&
          advocates.map((advocate, index) => {
            return (
              <>
                <AdvocateCard
                  key={advocate.id}
                  name={`${advocate.firstName || "?"} ${
                    advocate.lastName || "?"
                  }`}
                  degree={advocate.degree}
                  specialties={advocate.specialties}
                  yearsOfExperience={advocate.yearsOfExperience}
                  city={advocate.city}
                />
              </>
            );
            // return <div key={index}>{index} testing</div>;
          })}
      </div>
    </>
  );
};

export default AdvocateList;
