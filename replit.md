# replit.md

## Overview

This is a full-stack web application for Dr. Jana Hof's medical practice website, built with a modern tech stack combining React frontend with Express.js backend. The application features a sophisticated design system with 3D animations, interactive components, and a comprehensive content management approach for showcasing medical procedures, patient testimonials, and practice information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built with React and uses Vite as the build tool. The frontend architecture includes:

- **Component Architecture**: Uses a component-based structure with Radix UI for accessible, unstyled components
- **Styling System**: Implements Tailwind CSS with shadcn/ui components for consistent design patterns
- **3D Graphics**: Integrates React Three Fiber and Drei for 3D animations and interactive elements
- **State Management**: Uses TanStack React Query for server state management and data fetching
- **Form Handling**: React Hook Form with Zod validation for robust form management
- **Theme System**: Custom theme configuration with Replit's shadcn theme plugin

### Backend Architecture
The server-side uses Express.js with TypeScript in a modern ESM setup:

- **API Structure**: RESTful API design with Express.js
- **TypeScript Integration**: Full TypeScript support with strict typing enabled
- **Session Management**: PostgreSQL-based session storage using connect-pg-simple
- **Development Tooling**: TSX for development server with hot reloading

### Data Storage Solutions
The application uses a PostgreSQL database with Drizzle ORM:

- **Database**: PostgreSQL with Neon serverless database integration
- **ORM**: Drizzle ORM for type-safe database queries and schema management
- **Schema Management**: Centralized schema definition in `shared/schema.ts`
- **Migrations**: Drizzle Kit for database migrations and schema synchronization

### Authentication and Authorization
Session-based authentication system:

- **Session Storage**: PostgreSQL-backed sessions for persistence
- **Session Security**: Connect-pg-simple for secure session management
- **User Management**: Integrated with the main database schema

### Development and Build System
Modern development workflow with:

- **Module System**: ESM modules throughout the application
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Development Environment**: Concurrent development servers for frontend and backend
- **Path Resolution**: Custom path aliases for clean imports (`@/*`, `@shared/*`)

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Connection**: Uses `@neondatabase/serverless` for database connectivity

### UI and Design Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Pre-built component library built on Radix UI and Tailwind
- **React Three Fiber**: React renderer for Three.js for 3D graphics
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit environment
- **Runtime Error Handling**: Development error overlay for better debugging
- **Cartographer**: Development tool for project visualization (Replit-specific)

### Form and Validation
- **React Hook Form**: Forms with performance optimization and validation
- **Hookform Resolvers**: Integration layer for validation libraries
- **Zod**: Schema validation for type-safe form handling

### Utility Libraries
- **clsx**: Utility for constructing className strings conditionally
- **class-variance-authority**: Building type-safe component variants
- **cmdk**: Command palette component for enhanced user interaction
- **date-fns**: Date utility library for date manipulation