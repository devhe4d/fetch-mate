import React, { createContext, useContext, useState } from 'react';
import { defaultConfig } from './config';
import { CacheData, CacheType } from './types';

const CacheContext = createContext({
    cacheData: {} as CacheData,
    config: {
        ttl: 0,
        enabled: true,
        cacheType: 'memory' as CacheType,
        watch: []
    },
    setCacheData: (data: any) => {}
});

export function FetchMateStore(props: any) {
    const [cacheData, setCacheData] = useState({});

    const config = props.config || defaultConfig;

    const value = {
        cacheData,
        setCacheData,
        config
    };

    return <CacheContext.Provider value={value}>{props.children}</CacheContext.Provider>;
}

export function useCache() {
    const { cacheData, setCacheData } = useContext(CacheContext);
    return { cacheData, setCacheData };
}

export function useConfig() {
    const { config } = useContext(CacheContext);
    return { config };
}
