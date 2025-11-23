import { AuthContextProviderProps, AuthContextType, User } from "@/types/auth";
import { createContext, useState } from "react";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { useLoader } from "@/hooks/useLoader";

export const AuthContext = createContext({} as AuthContextType)

export const AuthContextProvider = (props: AuthContextProviderProps) => {
    const [ user, setUser ] = useState<User>();
    const { setLoading } = useLoader();

    const signIn = async(email: string, password: string) => {
        try{
            setLoading(true);
            //TODO: Implementar login e authenticacao
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        }catch(err){
            throw new Error(`Erro ao logar usuário: ${err}`);
        }finally{
            setLoading(false);
        }
        return;
    }
};