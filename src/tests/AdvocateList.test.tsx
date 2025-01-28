import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdvocateList from "@/components/AdvocateList";

import { Advocate } from "@/types/advocates";

describe("AdvocateList Component", () => {
  test("renders a list of advocates", () => {
    const advocates = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        degree: "MD",
        specialties: ["Cardiology"],
        yearsOfExperience: 10,
        city: "New York",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        degree: "PhD",
        specialties: ["Psychology"],
        yearsOfExperience: 5,
        city: "Los Angeles",
      },
    ];

    render(<AdvocateList advocates={advocates as Advocate[]} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
