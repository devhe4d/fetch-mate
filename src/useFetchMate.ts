import { useEffect, useState } from 'react';
import { GENERAL_CACHE_KEY } from './constants';
import { useCache, useConfig } from './store';
import { UseDataArgs, UseDataReturns } from './types';

export function useFetchMate<T>({
    src,
    enabled = true,
    watch = [],
    cacheKey = '',
    initData,
    cacheType = 'memory',
    ttl = 0,
    fallbackData,
    onDone,
    onError,
    onSuccess
}: UseDataArgs<T>): UseDataReturns<T> {
    const { config } = useConfig();
    const { cacheData, setCacheData } = useCache();
    const [data, setData] = useState<T | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isDone, setIsDone] = useState(false);

    ttl = ttl || config?.ttl;
    enabled = enabled || config?.enabled;
    cacheType = cacheType || config?.cacheType;
    watch = watch || config?.watch;

    const isCacheValid = () => {
        if (!cacheKey) return false;
        if (cacheType === 'memory') {
            if (!cacheData[cacheKey]) return false;
            const { timestamp, ttl: dataTTL } = cacheData[cacheKey];
            return dataTTL === 0 || timestamp + dataTTL > Date.now();
        }
        if (cacheType === 'session') {
            const sessionData = sessionStorage.getItem(GENERAL_CACHE_KEY);
            if (!sessionData) return false;
            const data = JSON.parse(sessionData);
            const { timestamp, ttl: dataTTL } = data[cacheKey];
            if (dataTTL > ttl) return false;
            return dataTTL === 0 || timestamp + dataTTL > Date.now();
        }
        if (cacheType === 'locale') {
            const localData = localStorage.getItem(GENERAL_CACHE_KEY);
            if (!localData) return false;
            const data = JSON.parse(localData);
            const { timestamp, ttl: dataTTL } = data[cacheKey];
            if (dataTTL > ttl) return false;
            return dataTTL === 0 || timestamp + dataTTL > Date.now();
        }
        return false;
    };

    const saveCacheInMemory = (data: T) => {
        setCacheData({
            ...cacheData,
            [cacheKey]: {
                data,
                timestamp: Date.now(),
                ttl
            }
        });
    };

    const saveCacheInStorage = (data: T) => {
        const cache = {
            [cacheKey]: { data, timestamp: Date.now(), ttl }
        };
        localStorage.setItem(GENERAL_CACHE_KEY, JSON.stringify(cache));
    };

    const saveCacheInSession = (data: T) => {
        const cache = {
            [cacheKey]: { data, timestamp: Date.now(), ttl }
        };
        sessionStorage.setItem(GENERAL_CACHE_KEY, JSON.stringify(cache));
    };

    const getCacheFromMemory = () => {
        return cacheData[cacheKey]?.data;
    };

    const getCacheFromStorage = () => {
        const cache = JSON.parse(localStorage.getItem(GENERAL_CACHE_KEY) || '{}');
        return cache[cacheKey]?.data;
    };

    const getCacheFromSession = () => {
        const cache = JSON.parse(sessionStorage.getItem(GENERAL_CACHE_KEY) || '{}');
        return cache[cacheKey]?.data;
    };

    const get = () => fetchData();

    async function fetchData() {
        if (!enabled) return;
        try {
            setIsLoading(true);
            setIsError(false);
            setIsSuccess(false);
            setIsDone(false);

            if (cacheKey && isCacheValid()) {
                if (cacheType === 'memory') {
                    setData(getCacheFromMemory());
                }
                if (cacheType === 'locale') {
                    setData(getCacheFromStorage());
                }
                if (cacheType === 'session') {
                    setData(getCacheFromSession());
                }
            } else {
                if (initData) setData(initData);
                const data = (await src()) as unknown as T;
                setData(data);

                if (cacheKey && cacheType === 'memory') {
                    saveCacheInMemory(data);
                }
                if (cacheKey && cacheType === 'locale') {
                    saveCacheInStorage(data);
                }

                if (cacheKey && cacheType === 'session') {
                    saveCacheInSession(data);
                }
            }

            setIsSuccess(true);
            setIsLoading(false);
            setIsDone(true);
            onSuccess && onSuccess(data);
        } catch (e: any) {
            setIsError(true);
            if (fallbackData) setData(fallbackData);
            setIsLoading(false);
            setIsDone(true);
            setError(e.message);
            onError && onError(e);
        } finally {
            setIsLoading(false);
            setIsDone(true);
            onDone && onDone();
        }
    }

    const deps = watch.length ? watch : [enabled];

    useEffect(() => {
        fetchData();
    }, [...deps]);

    return {
        data,
        isLoading,
        isError,
        isSuccess,
        isDone,
        get,
        error
    };
}
