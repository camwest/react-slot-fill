/// <reference types="react" />
import * as React from 'react';
import './App.css';
export interface State {
    example: string;
}
declare class App extends React.Component<void, State> {
    constructor();
    handleChange(event: React.ChangeEvent<HTMLSelectElement>): void;
    render(): JSX.Element;
}
export default App;
