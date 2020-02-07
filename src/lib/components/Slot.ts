import { managerShape } from '../utils/PropTypes';
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
  fillChildProps?: { [key: string]: any };
}

export interface State {
  components: Component[];
}

export interface Context {
  manager: Manager;
}

export default class Slot extends React.Component<Props, State> {
  static contextTypes = {
    manager: managerShape
  };

  context: Context;

  constructor(props: Props) {
    super(props);
    this.state = { components: [] };
    this.handleComponentChange = this.handleComponentChange.bind(this);
  }

  componentDidMount() {
    this.context.manager.onComponentsChange(this.props.name, this.handleComponentChange);
  }

  handleComponentChange(components: Component[]) {
    this.setState({ components });
  }

  get fills(): Fill[] {
    return this.state.components.map(c => c.fill);
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, prevContext: any): void {
    if (this.props.name !== prevProps.name) {
      this.context.manager.removeOnComponentsChange(prevProps.name, this.handleComponentChange);
      this.context.manager.onComponentsChange(this.props.name, this.handleComponentChange);
    }
  }

  componentWillUnmount() {
    const name = this.props.name;
    this.context.manager.removeOnComponentsChange(name, this.handleComponentChange);
  }

  render() {
    const aggElements: React.ReactNode[] = [];

    this.state.components.forEach((component, index) => {
      const { fill, children } = component;
      const { fillChildProps } = this.props;

      if (fillChildProps) {
        const transform = (acc: {}, key: string) => {
          const value = fillChildProps[key];

          if (typeof value === 'function') {
            acc[key] = () => value(fill, this.fills);
          } else {
            acc[key] = value;
          }

          return acc;
        };

        const fillChildProps2 = Object.keys(fillChildProps).reduce(transform, {});

        children.forEach((child, index2) => {
          if (typeof child === 'number' || typeof child === 'string') {
            throw new Error('Only element children will work here');
          }
          aggElements.push(
            React.cloneElement(child, { key: index.toString() + index2.toString(), ...fillChildProps2 })
          );
        });
      } else {
        children.forEach((child, index2) => {
          if (typeof child === 'number' || typeof child === 'string') {
            throw new Error('Only element children will work here');
          }

          aggElements.push(
            React.cloneElement(child, { key: index.toString() + index2.toString() })
          );
        });
      }
    });

    if (typeof this.props.children === 'function') {
      const element = this.props.children(aggElements);

      if (React.isValidElement(element) || element === null) {
        return element;
      } else {
        const untypedThis: any = this;
        const parentConstructor = untypedThis._reactInternalInstance._currentElement._owner._instance.constructor;
        const displayName = parentConstructor.displayName || parentConstructor.name;
        const message = `Slot rendered with function must return a valid React ` +
          `Element. Check the ${displayName} render function.`;
        throw new Error(message);
      }
    } else {
      return aggElements;
    }
  }
}
