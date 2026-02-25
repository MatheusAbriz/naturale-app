import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;
export const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export function setAuthToken(token?: string) {
    if (token) {
        API.defaults.headers.common.Authorization = `Bearer ${token}`;
        return;
    }
    delete API.defaults.headers.common.Authorization;
}

type UseQueryApiProps<T> = {
    queryKey: any[];
    queryFn: () => Promise<AxiosResponse<T>>;
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
};

export function useApi<T>({ queryKey, queryFn, enabled=true, staleTime, gcTime }: UseQueryApiProps<T>): UseQueryResult<T> & { request: () => Promise<any>; } {
    const query = useQuery({
        queryKey,
        queryFn,
        enabled,
        staleTime,
        gcTime,
        select: (res: AxiosResponse<T>) => res.data
    });

    return {
        ...query,
        request: query.refetch
    };
}