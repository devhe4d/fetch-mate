import React, { createContext, useContext, useState } from 'react';
import { defaultConfig } from './config';
const CacheContext = createContext({
    cacheData: {},
    config: {
        ttl: 0,
        enabled: true,
        cacheType: 'memory',
        watch: []
    },
    setCacheData: (data) => { }
});
export function FetchMateStore(props) {
    const [cacheData, setCacheData] = useState({});
    const config = props.config || defaultConfig;
    const value = {
        cacheData,
        setCacheData,
        config
    };
    return React.createElement(CacheContext.Provider, { value: value }, props.children);
}
export function useCache() {
    const { cacheData, setCacheData } = useContext(CacheContext);
    return { cacheData, setCacheData };
}
export function useConfig() {
    const { config } = useContext(CacheContext);
    return { config };
}
//# sourceMappingURL=store.js.map