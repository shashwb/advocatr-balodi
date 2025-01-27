import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";
import { act } from "react-dom/test-utils";

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => ({
      data: [{ id: 1, firstName: "John", lastName: "Doe" }],
    }),
  })
) as jest.Mock;

describe("Home component", () => {
  it("fetches and displays advocates", async () => {
    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Doe")).toBeInTheDocument();
    });
  });

  it("updates search term state when search input field changes", async () => {
    await act(async () => {
      render(<Home />);
    });

    const searchInput = screen.getByPlaceholderText(
      "Search by name, city, or specialty..."
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "john" } });
    });

    expect(searchInput.value).toBe("john");
  });

  it("sets error state when API request fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.getByText(/API Error/)).toBeInTheDocument();
    });
  });
});
