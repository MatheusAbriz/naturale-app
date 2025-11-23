import { createContext, useState } from "react";
import { LoaderContextType } from '../types/loader/index';

export const LoaderContext = createContext({} as LoaderContextType);

interface LoaderProviderProps {
    children: React.ReactNode;
}

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const contextValue: LoaderContextType = {
        loading,
        setLoading,
    };

    return (
        <LoaderContext.Provider value={contextValue}>
            {children}
        </LoaderContext.Provider>
    )
};