# Discussion

## Improvements Made

Below is a summary of the improvements and features I’ve implemented in the Solace assignment:

### **1. Strong Typing with TypeScript**

- Added TypeScript types to relevant files (`route.ts`, `page.tsx`, etc.) to ensure type safety and reduce runtime errors.
- Defined interfaces for consistent data handling (e.g., `Advocate` interface).

### **2. Dark Mode Toggle with Persistence**

- Implemented a dark mode toggle button using `localStorage` to persist the user’s theme preference across sessions.
- Added `useEffect` to initialize the theme based on system settings or previously saved preferences.

### **3. Debounced Search with Pagination**

- Integrated a debounced search bar using a custom `useDebounce` hook to reduce API calls during typing.
- Implemented basic pagination to allow navigation through results (partial implementation, see below for limitations).

### **4. Logical Separation of Concerns**

- Organized the project using a **feature-first filesystem** to separate reusable components, hooks, and backend logic:

### **5. Comprehensive Testing**

- Added **unit tests** for key components (e.g., `SearchBar`, `AdvocateList`, `Navbar`) and backend routes.
- Used **Jest** and **React Testing Library** to validate functionality and error handling.

### **6. Scalability in Features**

- Designed features like **pagination** and **debounced search** to handle large datasets efficiently.
- File organization and separation of concerns ensure the app is ready for additional features (e.g., filters, infinite scroll).

---

## Future Improvements

If I had more time, I would work on the following features and improvements:

### **1. Complete Pagination**

- Enhance pagination by ensuring the API returns `totalPages` to stop fetching beyond the last page.
- Test edge cases for pagination (e.g., invalid page numbers).

### **2. UI/UX Improvements**

- Add infinite scrolling to improve usability for large datasets.
- Introduce micro animations (e.g., hover effects, transitions) to make the UI more engaging.

### **3. Advanced Filters**

- Add a dedicated filter dropdown for advocate specialties, allowing users to select multiple specialties.
- Add a geolocation-enabled location picker (1/10th of the search bar UI) to allow users to search for advocates near them.

### **4. Scheduler Component**

- Clicking an advocate card would open a modal for scheduling appointments, similar to **Zocdoc**:
- Users can select a date and time based on availability.
- Backend route `/api/schedule` would handle scheduling logic.

### **5. Autocomplete Suggestions**

- Implement an autocomplete endpoint (`/api/search`) to provide real-time suggestions for search terms.
- Update the frontend search bar to display suggestions dynamically.

### **5. Better Testing!**

- I tried to test as I went along but had to balance adding features, designing the application and logic flow and also making sure components were dependable and passed testing. I did not test all components as thoroughly as I wanted to, and I am missing integration tests.

---

## Closing Thoughts

I’ve prioritized improvements that ensure scalability, maintainability, and usability. This project was a great opportunity to showcase my ability to organize features, implement responsive UI components, and write clean, testable code. Thank you for reviewing my work!
