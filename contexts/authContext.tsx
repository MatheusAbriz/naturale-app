import { setAuthToken } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { AuthContextProviderProps, AuthContextType, User } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { setLoading } = useLoader();

  const isLogged = async () => {
    try {
      setLoading(true);
      const userFromStorage = await AsyncStorage.getItem("user");
      if(!userFromStorage) return false;

      const parsedUser: User = JSON.parse(userFromStorage);
      setUser(parsedUser);
      setAuthToken(parsedUser?.token);
      
      return true;
    } catch { }
    finally {
      setLoading(false);
    }
  }

  const signIn = async (data: User) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(data));
      setAuthToken(data?.token);
      setUser(data);
    } catch (err) {
      throw new Error(`Erro ao logar usuário: ${err}`);
    } finally {
    }
    return;
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    setAuthToken(undefined);
  };

  useEffect(() => {
    isLogged();
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, signIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
