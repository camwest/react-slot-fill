/// <reference types="react" />
import * as React from 'react';
import * as mitt from 'mitt';
import Manager from '../Manager';
export default class Provider extends React.Component<void, void> {
    static childContextTypes: {
        manager: React.Requireable<any>;
        bus: React.Requireable<any>;
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
}
