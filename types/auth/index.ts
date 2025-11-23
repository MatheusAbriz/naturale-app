import { AuthContextProvider } from '../../contexts/authContext';
export type User = {
    id: number;
    email: string;
    apelido: string;
    tipo: string;
    avatar: string;
    token: string;
};

export type AuthContextType = {
    user: User;
    signIn: () => void;
    logout: () => void;
};

export type AuthContextProviderProps = {
    children: React.ReactNode;
};