# Agent Guidelines for react-automeet

## Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server  
- `pnpm lint` - Run ESLint
- No test framework configured yet

## Code Style
- **Imports**: Use `@/` path alias for src directory, organize imports (React first, then third-party, then local)
- **TypeScript**: Strict mode enabled, use explicit types, prefer interfaces over types for objects
- **Components**: PascalCase naming, use forwardRef for DOM elements, prefer functional components with hooks
- **Styling**: Tailwind CSS with class-variance-authority for variants, use `cn()` utility for class merging
- **Error Handling**: Try-catch blocks with setUser(null) fallback in auth, proper loading states with skeleton components
- **File Structure**: App Router pattern, components in `/components/ui/`, context in `/context/`, utilities in `/lib/`
- **UI Library**: shadcn/ui components with Radix UI primitives, dark mode by default
- **Auth**: Use AuthContext with localStorage for token storage, checkAuth() for verification