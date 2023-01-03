import { CacheType, ConfigArgs } from './types';

export const defaultConfig = {
    ttl: 0,
    enabled: true,
    cacheType: 'memory' as CacheType,
    watch: []
};

// create a constructor function to return a new instace of defaultConfig

export function FetchMateConfig(this: any, { ttl, enabled, cacheType, watch }: ConfigArgs = defaultConfig) {
    this.ttl = ttl;
    this.enabled = enabled;
    this.cacheType = cacheType;
    this.watch = watch;

    return this;
}
