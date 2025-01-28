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
  return (
    <>
      <div className="bg-white dark:bg-gray-600 hover:bg-teal-200 dark:hover:bg-teal-600 shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition-all duration-200 ease-in-out">
        <div className="relative bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-all duration-200 ease-in-out mb-10">
          <div className="flex items-center mb-4 relative">
            <div className="w-16 h-16 bg-gray-500 dark:bg-gray-700 rounded-full flex-shrink-0 relative">
              {/* Badge */}
              <div className="absolute bottom-0 right-0 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                {yearsOfExperience} yrs
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {name}, {degree}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{city}</p>
            </div>
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
        {/* <p className="text-sm text-gray-600 dark:text-gray-300">
          {yearsOfExperience} years of experience
        </p> */}
      </div>
    </>
  );
}
