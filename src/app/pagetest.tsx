/** ensure component testing is done correctly */
/** validate search functionalty */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./page";

// import "@testing-library/jest-dom/extend-expect";
// import { toBeInTheDocument } from '@testing-library/jest-dom';

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () =>
//       Promise.resolve({
//         data: [
//           {
//             id: 1,
//             firstName: "John",
//             lastName: "Doe",
//             city: "New York",
//             degree: "MD",
//             specialties: ["Cardiology"],
//             yearsOfExperience: 10,
//             phoneNumber: "1234567890",
//           },
//         ],
//       }),
//   })
// ) as jest.Mock;

describe("Home Page", () => {
  test("fetches and displays advocates", async () => {
    render(<Home />);
    expect(screen.getByText("Loading advocates...")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Doe")).toBeInTheDocument();
    });
  });
  //   test("filters advocates based on search input", async () => {
  //     render(<Home />);
  //     await waitFor(() => screen.getByText("John"));
  //     const searchInput = screen.getByPlaceholderText(
  //       "Search by name, city, or specialty..."
  //     );
  //     fireEvent.change(searchInput, { target: { value: "John" } });
  //     expect(screen.getByText("John")).toBeInTheDocument();
  //     expect(screen.queryByText("Doe")).toBeNull(); // Assuming there are no "Doe" matches for "John"
  //   });
  //   test("handles API errors gracefully", async () => {
  //     (global.fetch as jest.Mock).mockImplementationOnce(() =>
  //       Promise.reject(new Error("API Error"))
  //     );
  //     render(<Home />);
  //     await waitFor(() => {
  //       expect(
  //         screen.getByText("Failed to fetch advocates.")
  //       ).toBeInTheDocument();
  //     });
  //   });
});
