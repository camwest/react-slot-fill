/// <reference types="react" />
import * as React from 'react';
import './AppBar.css';
declare class AppBar extends React.Component<any, any> {
    static PrimaryItem: (props: any) => JSX.Element;
    static UtilityItem: (props: any) => JSX.Element;
    constructor(props: any);
    handleActivate(target: any): void;
    render(): JSX.Element;
}
export default AppBar;
