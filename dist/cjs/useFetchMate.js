"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetchMate = void 0;
const react_1 = require("react");
const constants_1 = require("./constants");
const store_1 = require("./store");
function useFetchMate({ src, enabled = true, watch = [], cacheKey = '', initData, cacheType = 'memory', ttl = 0, fallbackData, onDone, onError, onSuccess }) {
    const { config } = (0, store_1.useConfig)();
    const { cacheData, setCacheData } = (0, store_1.useCache)();
    const [data, setData] = (0, react_1.useState)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [isError, setIsError] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)('');
    const [isSuccess, setIsSuccess] = (0, react_1.useState)(false);
    const [isDone, setIsDone] = (0, react_1.useState)(false);
    ttl = ttl || (config === null || config === void 0 ? void 0 : config.ttl);
    enabled = enabled || (config === null || config === void 0 ? void 0 : config.enabled);
    cacheType = cacheType || (config === null || config === void 0 ? void 0 : config.cacheType);
    watch = watch || (config === null || config === void 0 ? void 0 : config.watch);
    const isCacheValid = () => {
        if (!cacheKey)
            return false;
        if (cacheType === 'memory') {
            if (!cacheData[cacheKey])
                return false;
            const { timestamp, ttl: dataTTL } = cacheData[cacheKey];
            return dataTTL === 0 || timestamp + dataTTL > Date.now();
        }
        if (cacheType === 'session') {
            const sessionData = sessionStorage.getItem(constants_1.GENERAL_CACHE_KEY);
            if (!sessionData)
                return false;
            const data = JSON.parse(sessionData);
            const { timestamp, ttl: dataTTL } = data[cacheKey];
            if (dataTTL > ttl)
                return false;
            return dataTTL === 0 || timestamp + dataTTL > Date.now();
        }
        if (cacheType === 'locale') {
            const localData = localStorage.getItem(constants_1.GENERAL_CACHE_KEY);
            if (!localData)
                return false;
            const data = JSON.parse(localData);
            const { timestamp, ttl: dataTTL } = data[cacheKey];
            if (dataTTL > ttl)
                return false;
            return dataTTL === 0 || timestamp + dataTTL > Date.now();
        }
        return false;
    };
    const saveCacheInMemory = (data) => {
        setCacheData(Object.assign(Object.assign({}, cacheData), { [cacheKey]: {
                data,
                timestamp: Date.now(),
                ttl
            } }));
    };
    const saveCacheInStorage = (data) => {
        const cache = {
            [cacheKey]: { data, timestamp: Date.now(), ttl }
        };
        localStorage.setItem(constants_1.GENERAL_CACHE_KEY, JSON.stringify(cache));
    };
    const saveCacheInSession = (data) => {
        const cache = {
            [cacheKey]: { data, timestamp: Date.now(), ttl }
        };
        sessionStorage.setItem(constants_1.GENERAL_CACHE_KEY, JSON.stringify(cache));
    };
    const getCacheFromMemory = () => {
        var _a;
        return (_a = cacheData[cacheKey]) === null || _a === void 0 ? void 0 : _a.data;
    };
    const getCacheFromStorage = () => {
        var _a;
        const cache = JSON.parse(localStorage.getItem(constants_1.GENERAL_CACHE_KEY) || '{}');
        return (_a = cache[cacheKey]) === null || _a === void 0 ? void 0 : _a.data;
    };
    const getCacheFromSession = () => {
        var _a;
        const cache = JSON.parse(sessionStorage.getItem(constants_1.GENERAL_CACHE_KEY) || '{}');
        return (_a = cache[cacheKey]) === null || _a === void 0 ? void 0 : _a.data;
    };
    const get = () => fetchData();
    function fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('enabled', enabled);
            if (!enabled)
                return;
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
                }
                else {
                    if (initData)
                        setData(initData);
                    const data = (yield src());
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
            }
            catch (e) {
                setIsError(true);
                if (fallbackData)
                    setData(fallbackData);
                setIsLoading(false);
                setIsDone(true);
                setError(e.message);
                onError && onError(e);
            }
            finally {
                setIsLoading(false);
                setIsDone(true);
                onDone && onDone();
            }
        });
    }
    const deps = watch.length ? watch : [enabled];
    (0, react_1.useEffect)(() => {
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
exports.useFetchMate = useFetchMate;
//# sourceMappingURL=useFetchMate.js.map