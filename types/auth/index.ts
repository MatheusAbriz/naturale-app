import { UserRoles } from "@/enums/AuthEnums";

export type User = {
  id: number;
  email: string;
  username: string;
  role: UserRoles;
  avatar: string;
  token: string;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: User) => Promise<void>;
  logout: () => Promise<void>;
};

export type AuthContextProviderProps = {
  children: React.ReactNode;
};

