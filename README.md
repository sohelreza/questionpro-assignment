# QuestionPro Assignment

A React application with two features: a Todo List with filtering and pagination, and a Dynamic Form Builder with preview and submission.

## Tech Stack

- React (Vite)
- React Router
- React Query (TanStack Query)
- CSS Modules

## Setup

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`

## Approach

### Todo List (`/todos`)

- Data is fetched from JSONPlaceholder API using React Query with `staleTime: Infinity` to keep data cached across navigation
- Filter state (user, status, search) is stored in a React Context so it persists when navigating between pages without using localStorage
- Filters reset on page refresh as expected
- Client-side pagination with 10 items per page
- Users are fetched separately and mapped to todos by userId

### Dynamic Form Builder (`/form-builder`)

- Users can define form fields with labels and input types (text, number, email, textarea, dropdown, checkbox, radio, date)
- Dropdown and radio types allow comma-separated options
- Form configuration is saved to localStorage

### Form Preview (`/form-preview`)

- Reads saved form config from localStorage and renders the actual form inputs
- On submit, form data is printed to the browser console

## Improvements

- Add form validation on the preview page
- Add drag-and-drop reordering of fields in the builder
- Add ability to edit/duplicate existing fields
- Add export/import of form configurations
