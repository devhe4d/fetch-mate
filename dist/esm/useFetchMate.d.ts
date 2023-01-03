import { UseDataArgs, UseDataReturns } from './types';
export declare function useFetchMate<T>({ src, enabled, watch, cacheKey, initData, cacheType, ttl, fallbackData, onDone, onError, onSuccess }: UseDataArgs<T>): UseDataReturns<T>;
