"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchMateConfig = exports.defaultConfig = void 0;
exports.defaultConfig = {
    ttl: 0,
    enabled: true,
    cacheType: 'memory',
    watch: []
};
// create a constructor function to return a new instace of defaultConfig
function FetchMateConfig({ ttl, enabled, cacheType, watch } = exports.defaultConfig) {
    this.ttl = ttl;
    this.enabled = enabled;
    this.cacheType = cacheType;
    this.watch = watch;
    return this;
}
exports.FetchMateConfig = FetchMateConfig;
//# sourceMappingURL=config.js.map