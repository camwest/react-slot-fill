/// <reference types="react" />
import * as React from 'react';
import Fill from './Fill';
import Manager, { Component } from '../Manager';
import { Requireable } from 'prop-types';
export interface Props {
    /**
     * The name of the component. Use a symbol if you want to be 100% sue the Slot
     * will only be filled by a component you create
     */
    name: string | Symbol;
    /**
     * Props to be applied to the child Element of every fill which has the same name.
     *
     *  If the value is a function, it must have the following signature:
     *    (target: Fill, fills: Fill[]) => void;
     *
     *  This allows you to access props on the fill which invoked the function
     *  by using target.props.something()
     */
    fillChildProps?: {
        [key: string]: any;
    };
}
export interface State {
    components: Component[];
}
export interface Context {
    manager: Manager;
}
export default class Slot extends React.Component<Props, State> {
    static contextTypes: {
        manager: Requireable<any>;
    };
    context: Context;
    constructor(props: Props);
    componentWillMount(): void;
    handleComponentChange(components: Component[]): void;
    readonly fills: Fill[];
    componentWillReceiveProps(nextProps: Props): void;
    componentWillUnmount(): void;
    render(): any;
}
