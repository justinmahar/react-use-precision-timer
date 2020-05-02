"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
// Learn how to write hooks:
// https://reactjs.org/docs/hooks-intro.html
/** */
exports.useExample = function (defaultValue) {
    var _a = React.useState(defaultValue), value = _a[0], setValue = _a[1];
    return [value, setValue];
};
