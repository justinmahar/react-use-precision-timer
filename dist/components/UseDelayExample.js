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
exports.OneSecondDelay = exports.UseDelayExample = void 0;
const React = __importStar(require("react"));
const useDelay_1 = require("../hooks/useDelay");
function UseDelayExample() {
    const [run, setRun] = React.useState(false);
    return (React.createElement("div", null,
        !run && React.createElement("button", { onClick: (e) => setRun(true) }, "\u25B6\uFE0F Run 1 Second Delay"),
        run && React.createElement(OneSecondDelay, null)));
}
exports.UseDelayExample = UseDelayExample;
function OneSecondDelay() {
    const [firedAt, setFiredAt] = React.useState(0);
    (0, useDelay_1.useDelay)(1000, () => setFiredAt(new Date().getTime()));
    return React.createElement(React.Fragment, null,
        "Timer fired? ",
        firedAt > 0 ? `✔️ (at ${firedAt})` : '❌');
}
exports.OneSecondDelay = OneSecondDelay;