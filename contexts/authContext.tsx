import { AuthContextProviderProps, AuthContextType, User } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      //TODO: Implementar login e authenticacao
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (err) {
      throw new Error(`Erro ao logar usuário: ${err}`);
    } finally {
    }
    return;
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, signIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
