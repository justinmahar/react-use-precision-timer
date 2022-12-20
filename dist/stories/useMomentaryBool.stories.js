"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerStory = void 0;
const react_1 = __importDefault(require("react"));
const UseMomentaryBoolExample_1 = require("../components/UseMomentaryBoolExample");
const TimerStory = () => react_1.default.createElement(UseMomentaryBoolExample_1.UseMomentaryBoolExample, null);
exports.TimerStory = TimerStory;
exports.TimerStory.story = {
    name: 'Hook Visual',
};
exports.default = {};
