import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdvocateCard from "@/components/AdvocateCard";

describe("AdvocateCard Component", () => {
  test("renders advocate details", () => {
    render(
      <AdvocateCard
        name="John Doe"
        degree="MD"
        specialties={["Cardiology", "Neurology"]}
        yearsOfExperience={10}
        city="New York"
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("MD")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("Cardiology")).toBeInTheDocument();
  });
});
