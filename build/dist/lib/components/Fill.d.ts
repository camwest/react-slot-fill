/// <reference types="react" />
import * as React from 'react';
import { Requireable } from 'prop-types';
export interface Props {
    name: string | Symbol;
    [key: string]: any;
}
export default class Fill extends React.Component<Props, {}> {
    static contextTypes: {
        bus: Requireable<any>;
    };
    componentWillMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): null;
}
