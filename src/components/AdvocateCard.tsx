/**
 * advocate card will contain
 * -> name, degree, specialties, years of experience, city
 */

/** what props does this have? Make an interface */
interface AdvocateCardProps {
  name: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  city: string;
}

const AdvocateCard = ({
  name,
  degree,
  specialties,
  yearsOfExperience,
  city,
}: AdvocateCardProps): JSX.Element => {
  return (
    <div>
      <h1>Advocate Card</h1>
    </div>
  );
};

export default AdvocateCard;
