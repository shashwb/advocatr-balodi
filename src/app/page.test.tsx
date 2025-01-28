import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";
import { act } from "react";

// At the top of src/app/page.test.tsx
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});
afterAll(() => {
  console.error = originalError;
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => ({
      data: [{ id: 1, firstName: "John", lastName: "Doe", degree: "MD" }],
    }),
  })
) as jest.Mock;

describe("Home component", () => {
  it("fetches and displays advocates", async () => {
    await act(async () => {
      render(<Home />);
    });

    expect(await screen.findByText("John Doe, MD")).toBeInTheDocument();
  });

  it("updates search term state when input changes", async () => {
    await act(async () => {
      render(<Home />);
    });

    const searchInput = screen.getByPlaceholderText(
      "Search by name, city, or specialty..."
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: "john" } });
    expect(searchInput.value).toBe("john");
  });

  it("handles API errors gracefully", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    await act(async () => {
      render(<Home />);
    });

    await waitFor(() =>
      expect(
        screen.getByText("Failed to load advocates. Please try again.")
      ).toBeInTheDocument()
    );
  });
});
