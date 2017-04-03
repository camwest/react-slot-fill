/// <reference types="react" />
import * as React from 'react';
export default class Settings extends React.Component<any, any> {
    static Group: ({label, children}: any) => JSX.Element;
    static TextInput: ({label, ...rest}: any) => JSX.Element;
    static Checkbox: ({label, ...rest}: any) => JSX.Element;
    constructor(props: any);
    handleEnter(): void;
    handleExit(): void;
    render(): JSX.Element;
}
