export type User = {
  id: number;
  email: string;
  username: string;
  role: string;
  avatar: string;
  token: string;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export type AuthContextProviderProps = {
  children: React.ReactNode;
};
