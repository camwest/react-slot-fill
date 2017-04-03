/// <reference types="react" />
import * as React from 'react';
import './Workspace.css';
declare class Workspace extends React.Component<any, any> {
    static AppBar: (props: any) => JSX.Element;
    static Panel: (props: any) => JSX.Element;
    static Canvas: (props: any) => JSX.Element;
    constructor(props: any);
    handleOnMount(): void;
    handleOnUnmount(): void;
    handleSplitChange(size: any): void;
    render(): JSX.Element;
}
export default Workspace;
