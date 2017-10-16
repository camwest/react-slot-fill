/// <reference types="react" />
import Fill from './components/Fill';
import * as mitt from 'mitt';
export declare type Name = string | Symbol;
export declare type Listener = (components: Component[]) => void;
export interface Component {
    name: Name;
    fill: Fill;
    children: React.ReactChild[];
}
export interface FillRegistration {
    listeners: Listener[];
    components: Component[];
}
export interface Db {
    byName: Map<Name, FillRegistration>;
    byFill: Map<Fill, Component>;
}
export default class Manager {
    private _bus;
    private _db;
    constructor(bus: mitt.Emitter);
    mount(): void;
    unmount(): void;
    handleFillMount({fill}: {
        fill: Fill;
    }): void;
    handleFillUpdated({fill}: {
        fill: Fill;
    }): void;
    handleFillUnmount({fill}: {
        fill: Fill;
    }): void;
    /**
     * Triggers once immediately, then each time the components change for a location
     *
     * name: String, fn: (components: Component[]) => void
     */
    onComponentsChange(name: Name, fn: Listener): void;
    getFillsByName(name: string): Fill[];
    getChildrenByName(name: string): React.ReactChild[];
    /**
     * Removes previous listener
     *
     * name: String, fn: (components: Component[]) => void
     */
    removeOnComponentsChange(name: Name, fn: Listener): void;
}
