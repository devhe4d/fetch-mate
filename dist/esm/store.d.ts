import { CacheData, CacheType } from './types';
export declare function FetchMateStore(props: any): JSX.Element;
export declare function useCache(): {
    cacheData: CacheData;
    setCacheData: (data: any) => void;
};
export declare function useConfig(): {
    config: {
        ttl: number;
        enabled: boolean;
        cacheType: CacheType;
        watch: never[];
    };
};
