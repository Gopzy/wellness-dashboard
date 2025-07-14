# Wellness Log Dashboard

A responsive, elegant, and scalable "Wellness Tracker Dashboard" built with React, Redux Toolkit, TypeScript, Tailwind CSS, and Zod. It supports secure user authentication, real-time wellness log tracking, theme switching,

## Features

### Authentication

- Secure Signup and Login with real API integration
- JWT-based session handling
- User persisted in Redux and localStorage to survive page refresh
- Logout clears session and Redux state

### Wellness Logging

- Log daily mood, sleep hours, and activity notes
- Fully validated using Zod + react-hook-form
- Realtime UI update on new log submission
- Form resets with confirmation toast on success

### Log Display

- Lazy-loaded LogTable lists user’s logs with:
  - Date
  - Mood
  - Sleep hours
  - Activity notes

### Search functionality

- Instant search functionality to filter logs by notes
- Styled for mobile and desktop using Tailwind's responsive utilities

### Theme Switching (Light/Dark)

- Toggle dark/light mode via header button
- Preference saved in Redux and persisted in localStorage
- Applied with Tailwind’s darkMode: 'class' support

### Redux & API Integration

- Centralized store with slices for auth, logs, ui, and theme
- Async thunks for login, signup, loading logs, and submitting entries
- Global UI loading state tracking via uiSlice

### Performance Optimization

- Lazy loaded components using React.lazy and Suspense
- LoadingWrapper dispatches global UI loading state for feedback
- LogTable and other non-critical features are code-split

## API handling through json-server

All API requests—signup, login, and wellness log storage—are handled through json-server. The mock API runs locally on http://localhost:3001 and uses a db.json file to persist user and log data

## Tailwind CSS Responsiveness

All UI components are built using Tailwind CSS with a strong focus on responsiveness

- Uses Tailwind’s sm, md, lg and xl breakpoints
- Layouts are fully optimized for both mobile and desktop
- Clean and minimal design with accessible color contrast

## Tech Stack

-Frontend: React 18, TypeScript
-State Management: Redux Toolkit
-Form Handling: React Hook Form + Zod
-Styling: Tailwind CSS (with darkMode: "class")
-Routing: React Router v6
-Mock Backend: json-server

## How to run the Application

-Step 1: npm install
-Step 2: npx json-server --watch db.json --port 3001
-Step 3: npm start
