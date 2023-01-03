export const defaultConfig = {
    ttl: 0,
    enabled: true,
    cacheType: 'memory',
    watch: []
};
// create a constructor function to return a new instace of defaultConfig
export function FetchMateConfig({ ttl, enabled, cacheType, watch } = defaultConfig) {
    this.ttl = ttl;
    this.enabled = enabled;
    this.cacheType = cacheType;
    this.watch = watch;
    return this;
}
//# sourceMappingURL=config.js.map