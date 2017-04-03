/// <reference types="react" />
import * as React from 'react';
declare class Toolbar extends React.Component<any, any> {
    static Item: ({label, onActive, onDeactive}: any) => JSX.Element;
    constructor(props: any);
    handleClick({props}: any): void;
    render(): JSX.Element;
}
export default Toolbar;
