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
  const mockSpecialties: string[] = [
    "Bipolar",
    "LGBTQ",
    "Medication/Prescribing",
    "Suicide History/Attempts",
    "General Mental Health (anxiety, depression, stress, grief, life transitions)",
    "Men's issues",
    "Relationship Issues (family, friends, couple, etc)",
    "Trauma & PTSD",
    "Personality disorders",
    "Personal growth",
    "Substance use/abuse",
    "Pediatrics",
    // "Women's issues (post-partum, infertility, family planning)",
    // "Chronic pain",
    // "Weight loss & nutrition",
    // "Eating disorders",
    // "Diabetic Diet and nutrition",
    // "Coaching (leadership, career, academic and wellness)",
    // "Life coaching",
    // "Obsessive-compulsive disorders",
    // "Neuropsychological evaluations & testing (ADHD testing)",
    // "Attention and Hyperactivity (ADHD)",
    // "Sleep issues",
    // "Schizophrenia and psychotic disorders",
    // "Learning disorders",
    // "Domestic abuse",
  ];

  return (
    <div>
      <h1>Advocate Card</h1>
      <div className="bg-white dark:bg-gray-200 shadow-xs rounded-lg p-4 hover:shadow-lg transition-all duration-1000 ease-in-out">
        {/* Avatar and advocate info */}
        <div className="flex items-center mb-4">
          {/* maintain size even if parent becomes smaller */}
          <div className="w-16 h-16 bg-gray-500 dark:bg-gray-700 rounded-full flex-shrink-0">
            avatar
          </div>
          <div className="bg-gray-200 ml-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-800">
              {name || "name"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-600">
              {degree || "degree"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-600">
              {city || "city"}
            </p>
          </div>
        </div>

        {/* Specialty tags */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2 text-teal-800 dark:text-teal-900">
            Specialties
          </h3>
          <div className="flex flex-wrap p-3 gap-2">
            {mockSpecialties &&
              mockSpecialties.map((specialty: string, index: number) => {
                return (
                  <span
                    key={index}
                    className="px-2 py-1 bg-teal-100 dark:bg-teal-700 text-teal-1000 dark:text-teal-100 rounded text-xs"
                  >
                    {specialty}
                  </span>
                );
              })}
          </div>
        </div>

        {/* Years of experience */}
        <p className="text-sm text-gray-600 dark:text-gray-900">
          {yearsOfExperience || "yearsOfExperience: "} years of experience
        </p>
      </div>
    </div>
  );
};

export default AdvocateCard;
