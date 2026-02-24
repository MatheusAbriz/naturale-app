import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import Constants from "expo-constants";
import { useAuth } from './useAuth';

const { user } = useAuth();
const API_URL = Constants.expoConfig?.extra?.API_URL;
export const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.token}`
    }
}); 

type UseQueryApiProps<T> = {
    queryKey: any[];
    queryFn: () => Promise<AxiosResponse<T>>;
    staleTime: number;
    gcTime: number;
};

export function useApi<T>({ queryKey, queryFn, staleTime, gcTime }: UseQueryApiProps<T>): UseQueryResult<T> & { request: () => Promise<any>; } {
    const query = useQuery({
        queryKey,
        queryFn,
        enabled: false,
        staleTime,
        gcTime,
        select: (res: AxiosResponse<T>) => res.data
    });

    return {
        ...query,
        request: query.refetch
    };
}