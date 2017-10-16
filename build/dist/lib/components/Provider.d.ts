/// <reference types="react" />
import * as React from 'react';
import * as mitt from 'mitt';
import { Requireable } from 'prop-types';
import Manager from '../Manager';
import Fill from './Fill';
export default class Provider extends React.Component<{}, {}> {
    static childContextTypes: {
        manager: Requireable<any>;
        bus: Requireable<any>;
    };
    private _bus;
    private _manager;
    constructor();
    componentWillUnmount(): void;
    getChildContext(): {
        bus: mitt.Emitter;
        manager: Manager;
    };
    render(): React.ReactElement<any>;
    /**
     * Returns instances of Fill react components
     */
    getFillsByName(name: string): Fill[];
    /**
     * Return React elements that were inside Fills
     */
    getChildrenByName(name: string): React.ReactChild[];
}
