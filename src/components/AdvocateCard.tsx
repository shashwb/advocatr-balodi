interface AdvocateCardProps {
  name: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  city: string;
}

export default function AdvocateCard({
  name,
  degree,
  specialties,
  yearsOfExperience,
  city,
}: AdvocateCardProps) {
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
  ];

  const mockSpecialties_alt = [
    "Women's issues (post-partum, infertility, family planning)",
    "Chronic pain",
    "Weight loss & nutrition",
    "Eating disorders",
    "Diabetic Diet and nutrition",
    "Coaching (leadership, career, academic and wellness)",
    "Life coaching",
    "Obsessive-compulsive disorders",
    "Neuropsychological evaluations & testing (ADHD testing)",
    "Attention and Hyperactivity (ADHD)",
    "Sleep issues",
    "Schizophrenia and psychotic disorders",
    "Learning disorders",
    "Domestic abuse",
  ];

  return (
    <>
      <div className="bg-white dark:bg-gray-600 hover:bg-teal-200 dark:hover:bg-teal-600 shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition-all duration-200 ease-in-out">
        <div className="flex items-center mb-1">
          <div className="w-20 h-20 bg-gray-500 dark:bg-gray-900 rounded-full flex-shrink-0"></div>
          <div className="ml-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {name || "name"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {degree || "degree"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {city || "city"}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Specialties
          </h3>
          <div className="flex flex-wrap gap-2">
            {specialties &&
              specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-teal-100 dark:bg-teal-700 text-teal-800 dark:text-teal-100 rounded text-xs"
                >
                  {specialty}
                </span>
              ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {yearsOfExperience} years of experience
        </p>
      </div>
    </>
  );
}
