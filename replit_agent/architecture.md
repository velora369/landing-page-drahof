# Architecture Overview

## 1. Overview

This repository contains a full-stack web application for Dra. Jana Guimarães, a specialist in orofacial harmonization. The application consists of a React-based frontend and an Express-based backend. The application allows users to view information about the doctor's services, credentials, and testimonials, as well as subscribe to updates.

The application follows a modern architecture with:
- Client-side rendering using React
- Server-side API using Express
- PostgreSQL database with Drizzle ORM
- Type-safety throughout with TypeScript

## 2. System Architecture

The application follows a standard client-server architecture:

```
┌────────────────┐         ┌────────────────┐         ┌────────────────┐
│                │         │                │         │                │
│    Frontend    │ ◄────► │    Backend     │ ◄────► │    Database    │
│    (React)     │         │   (Express)    │         │  (PostgreSQL)  │
│                │         │                │         │                │
└────────────────┘         └────────────────┘         └────────────────┘
```

### Frontend (Client)
- Built with React, utilizing modern hooks and patterns
- Uses TanStack Query for API data fetching
- Styled with Tailwind CSS and leverages Shadcn UI components
- Animation handled with Framer Motion
- Client routing with Wouter

### Backend (Server)
- Express.js server providing RESTful API endpoints
- TypeScript for type safety
- Shared schema definitions between frontend and backend

### Database
- PostgreSQL database
- Drizzle ORM for database operations
- Schema defined in TypeScript for type safety

## 3. Key Components

### Frontend Components

The frontend is organized into several key components:

1. **Pages**
   - `Home.tsx`: Main landing page assembling all components
   - `NotFound.tsx`: 404 error page

2. **UI Components**
   - Shadcn UI components for consistent styling
   - Custom components like `Navigation`, `Hero`, `Benefits`, etc.
   - Toast notifications for user feedback

3. **State Management**
   - React Query for server state
   - React hooks for local state

### Backend Components

The backend consists of:

1. **API Routes**
   - REST endpoints for data operations
   - Subscription functionality

2. **Data Storage**
   - Interface-based storage abstraction allowing for different implementations
   - Memory-based storage implementation for development/testing
   - PostgreSQL database support via Drizzle ORM

3. **Schema**
   - Shared TypeScript schema definitions
   - Zod validation for request data

## 4. Data Flow

1. **User Interaction Flow**
   - User visits the website
   - Content is loaded and displayed from the server
   - User can interact with components (navigation, forms, etc.)
   - Form submissions trigger API calls to the backend

2. **API Request Flow**
   - Frontend makes API requests to backend endpoints
   - Backend validates requests using Zod schemas
   - Backend processes requests and interacts with storage layer
   - Responses are sent back to frontend with appropriate status codes

3. **Subscription Flow**
   - User submits contact information via a form
   - Data is validated on the frontend and sent to `/api/subscribe` endpoint
   - Backend validates the data and stores it in the database
   - Confirmation is displayed to the user

## 5. External Dependencies

### Frontend Dependencies
- **React**: Core UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **TanStack Query**: Data fetching and caching
- **Radix UI**: Accessible UI primitives
- **Shadcn UI**: Component library built on Radix UI
- **Wouter**: Lightweight routing library

### Backend Dependencies
- **Express.js**: Web server framework
- **Drizzle ORM**: Database ORM
- **Zod**: Schema validation
- **TypeScript**: Static typing

### Database
- **PostgreSQL**: Relational database
- **Neon Database**: Serverless Postgres (via `@neondatabase/serverless`)

## 6. Deployment Strategy

The application is configured for deployment on Replit:

1. **Build Process**
   - Frontend: Vite bundles the React application
   - Backend: esbuild compiles TypeScript to JavaScript

2. **Development Environment**
   - Local development using `npm run dev`
   - Vite's hot module replacement for frontend
   - Automatic server restart with tsx

3. **Production Deployment**
   - Build step: `npm run build`
   - Start command: `NODE_ENV=production node dist/index.js`
   - Configured for automatic deployment on Replit

4. **Database Management**
   - Schema migrations with Drizzle Kit
   - Connection pooling for efficient database usage

## 7. Schema Definition

The application uses two main database tables:

1. **Users Table**
   - `id`: Serial primary key
   - `username`: Unique username (not null)
   - `password`: Password (not null)

2. **Subscribers Table**
   - `id`: Serial primary key
   - `email`: Unique email address (not null)
   - `name`: Subscriber's name (not null)
   - `created_at`: Timestamp (not null, defaults to "now()")

Schema validation is handled through Zod, with schemas created from Drizzle table definitions.

## 8. Security Considerations

1. **Input Validation**
   - All user inputs are validated using Zod schemas
   - API endpoints handle validation errors appropriately

2. **Error Handling**
   - Structured error handling throughout the application
   - Proper HTTP status codes for different error conditions
   - Client-friendly error messages

3. **Future Enhancements**
   - The system is designed to potentially add authentication mechanisms
   - Password storage is currently simple but could be enhanced with proper hashing