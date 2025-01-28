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
 * @param {AdvocateListProps} props - A props object with an `advocates` property.
 * @returns {JSX.Element} A JSX.Element representing the AdvocateList component.
 */
const AdvocateList = ({ advocates }: AdvocateListProps): JSX.Element => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {advocates &&
          advocates.map((advocate) => (
            <AdvocateCard
              key={advocate.id}
              name={`${advocate.firstName || "?"} ${advocate.lastName || "?"}`}
              degree={advocate.degree}
              specialties={advocate.specialties}
              yearsOfExperience={advocate.yearsOfExperience}
              city={advocate.city}
            />
          ))}
      </div>
    </>
  );
};

export default AdvocateList;
