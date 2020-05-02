/// <reference types="react" />
export interface ExampleComponentProps {
    /** The text to render. */
    text?: string;
}
/**
 * Example component that renders the text its given.
 *
 * @returns The rendered component.
 */
export declare function ExampleComponent(props: ExampleComponentProps): JSX.Element;
export declare namespace ExampleComponent {
    var defaultProps: {};
}
