"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerStory = void 0;
const react_1 = __importDefault(require("react"));
const UseTimerExample_1 = require("../components/UseTimerExample");
// Needed to wrap the hook and give it visual representation.
exports.default = {};
const TimerStory = () => react_1.default.createElement(UseTimerExample_1.UseTimerExample, null);
exports.TimerStory = TimerStory;
exports.TimerStory.story = {
    name: 'Hook Visual',
};
