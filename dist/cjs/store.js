"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConfig = exports.useCache = exports.FetchMateStore = void 0;
const react_1 = __importStar(require("react"));
const config_1 = require("./config");
const CacheContext = (0, react_1.createContext)({
    cacheData: {},
    config: {
        ttl: 0,
        enabled: true,
        cacheType: 'memory',
        watch: []
    },
    setCacheData: (data) => { }
});
function FetchMateStore(props) {
    const [cacheData, setCacheData] = (0, react_1.useState)({});
    const config = props.config || config_1.defaultConfig;
    const value = {
        cacheData,
        setCacheData,
        config
    };
    return react_1.default.createElement(CacheContext.Provider, { value: value }, props.children);
}
exports.FetchMateStore = FetchMateStore;
function useCache() {
    const { cacheData, setCacheData } = (0, react_1.useContext)(CacheContext);
    return { cacheData, setCacheData };
}
exports.useCache = useCache;
function useConfig() {
    const { config } = (0, react_1.useContext)(CacheContext);
    return { config };
}
exports.useConfig = useConfig;
//# sourceMappingURL=store.js.map