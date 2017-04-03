/// <reference types="react" />
import * as React from 'react';
export declare class Binding extends React.Component<any, any> {
    static defaultProps: {
        hotkey: string;
        groupName: string;
        description: string;
        onInvoke: () => void;
    };
    render(): JSX.Element;
}
export default class Keybinding extends React.Component<any, any> {
    static Binding: typeof Binding;
    constructor(props: any);
    handleRegistered({props}: {
        props: any;
    }): void;
    handleUnregistered({props}: {
        props: any;
    }): void;
    render(): JSX.Element;
}
