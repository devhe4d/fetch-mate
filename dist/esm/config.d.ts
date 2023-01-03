import { CacheType, ConfigArgs } from './types';
export declare const defaultConfig: {
    ttl: number;
    enabled: boolean;
    cacheType: CacheType;
    watch: never[];
};
export declare function FetchMateConfig(this: any, { ttl, enabled, cacheType, watch }?: ConfigArgs): any;
