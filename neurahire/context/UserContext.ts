import { createContext } from "react";
import type { User } from '@supabase/supabase-js';

// Define context type
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

// Create context with default value
export const UserDetailContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},  // empty function as default
  loading: true,
});
