export type CacheType = 'memory' | 'locale' | 'session';

export interface UseDataArgs<T> {
    src: () => Promise<T> | (() => Promise<T>)[];
    cacheKey?: string;
    ttl?: number;
    cacheType?: CacheType;
    enabled?: boolean;
    watch?: any[];
    fallbackData?: T;
    initData?: any;
    onDone?: () => void;
    onError?: (error: any) => void;
    onSuccess?: (data: T | undefined) => void;
}

export interface UseDataReturns<T> {
    data?: T | T[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    isDone: boolean;
    error: any;
    get: () => void;
}

export interface ConfigArgs {
    ttl?: number;
    enabled?: boolean;
    cacheType?: CacheType;
    watch?: any[];
}
export interface CacheData {
    [key: string]: any;
}
