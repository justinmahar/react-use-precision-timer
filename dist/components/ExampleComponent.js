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
/**
 * Example component that renders the text its given.
 *
 * @returns The rendered component.
 */
function ExampleComponent(props) {
    return (React.createElement("div", { style: {
            padding: 10,
            border: 'solid 2px #0F52BA',
            color: '#0F52BA',
            backgroundColor: '#D9F1FF',
            display: 'inline-block',
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            userSelect: 'none',
        } }, typeof props.text !== 'undefined' ? props.text : 'Example Component'));
}
exports.ExampleComponent = ExampleComponent;
ExampleComponent.defaultProps = {};
