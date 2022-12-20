"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMomentaryBool = void 0;
const react_1 = __importDefault(require("react"));
const useDelay_1 = require("./useDelay");
const useMomentaryBool = (initial, delay) => {
    const [state, setState] = react_1.default.useState(initial);
    const callback = react_1.default.useCallback(() => setState(initial), [initial]);
    const onceTimer = (0, useDelay_1.useDelay)(delay, callback);
    const toggle = react_1.default.useCallback(() => {
        setState(!initial);
        onceTimer.start();
    }, [onceTimer, initial]);
    return [state, toggle];
};
exports.useMomentaryBool = useMomentaryBool;
