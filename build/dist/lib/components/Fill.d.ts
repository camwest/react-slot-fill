/// <reference types="react" />
import * as React from 'react';
export interface Props {
    name: string | Symbol;
    [key: string]: any;
}
export default class Fill extends React.Component<Props, void> {
    static contextTypes: {
        bus: React.Requireable<any>;
    };
    componentWillMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): null;
}
