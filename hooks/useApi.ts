import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useAuth } from './useAuth';

const { user } = useAuth();
export const API = axios.create({
    baseURL: import.meta.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.token}`
    }
});

type UseQueryApiProps<T> = {
    queryKey: any[];
    queryFn: () => Promise<AxiosResponse<T>>;
};

export function useApi<T>({ queryKey,queryFn }: UseQueryApiProps<T>): UseQueryResult<T> & { request: () => Promise<any>; } {
    const query = useQuery({
        queryKey,
        queryFn,
        enabled: false,
        select: (res: AxiosResponse<T>) => res.data
    });

    return {
        ...query,
        request: query.refetch
    };
}