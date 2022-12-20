"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseMomentaryBoolExample = void 0;
const react_1 = __importDefault(require("react"));
const useMomentaryBool_1 = require("../hooks/useMomentaryBool");
const UseMomentaryBoolExample = () => {
    const [delay, setDelay] = react_1.default.useState(1000);
    const [value, toggle] = (0, useMomentaryBool_1.useMomentaryBool)(false, delay);
    return (react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column', rowGap: 10 } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("input", { type: "range", id: "points", name: "points", min: "10", max: "5000", value: delay, onChange: (e) => {
                    setDelay(parseInt(e.target.value));
                } }),
            ' ',
            delay,
            " milliseconds"),
        react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: toggle }, value ? '✅ Clicked!' : 'Click Me!')),
        react_1.default.createElement("div", null,
            "Value: ",
            react_1.default.createElement("code", null, `${value}`))));
};
exports.UseMomentaryBoolExample = UseMomentaryBoolExample;
