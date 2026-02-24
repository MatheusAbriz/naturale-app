import { useLoader } from "@/hooks/useLoader";
import { AuthContextProviderProps, AuthContextType, User } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { setLoading } = useLoader();

  const isLogged = async () => {
    setLoading(true);
    const userFromStorage = await AsyncStorage.getItem("user");
    if(!userFromStorage) return false;

    const parsedUser = JSON.parse(userFromStorage);
    setUser(parsedUser);
    setLoading(false);
    return true;
  }

  const signIn = async (data: User) => {
    try {
      //TODO: Implementar login e authenticacao
      await AsyncStorage.setItem("user", JSON.stringify(data));
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
