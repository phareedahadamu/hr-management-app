HR Management App – HCMatrix Assessment

This repository contains the HR Management App built as part of an assessment for HCMatrix. The application is a modern, responsive HR dashboard that allows management to view employees, search through employee data, and see individual employee details.

The app was implemented following a provided Figma design and integrates with predefined API endpoints for authentication and employee data.

Login / Logout: Secure authentication for HR personnel.

Dashboard: Quick overview of HR metrics (as per Figma design).

All Employees Table:

Paginated list of employees.

Search and filter by employee name or ID.

Single Employee Details: View detailed employee information.

Responsive UI: Mobile-first design using Tailwind CSS.

Form Validation: Using react-hook-form + zod for type-safe forms.

Tech Stack

Framework: Next.js (App Router) + TypeScript

Styling: Tailwind CSS

Data Fetching & Caching: React Query

Form Handling & Validation: React Hook Form + Zod

API Integration: REST endpoints (provided in assessment)

Available Endpoints

The app integrates with the following endpoints (as per assessment instructions):

Endpoint Method Description
/api/auth/login POST Authenticate HR user
/api/v1/logout POST Log out user
/api/v1/dashboard GET Fetch dashboard metrics
/api/v1/employee GET Fetch all employees (supports search & pagination)
/api/v1/employee/:id GET Fetch details of a single employee

All endpoints require Bearer token authentication where applicable.

Form Validation

react-hook-form + zod ensures type-safe form validation.

Example: Login form validates email and password fields with real-time error messages.

State Management & Data Fetching

React Query handles data fetching, caching, and pagination.

Optimistic updates and refetching ensure smooth UX when interacting with employee data.

License

This project is for assessment purposes and is not intended for production use.
