import * as React from 'react';
import { managerShape } from '../utils/PropTypes';
import Manager, { Component } from '../Manager';

interface Props {
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

interface State {
  components: Component[];
}

interface Context {
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

  componentWillMount() {
    this.context.manager.onComponentsChange(this.props.name, this.handleComponentChange);
  }

  handleComponentChange(components: Component[]) {
    this.setState({ components });
  }

  get fills() {
    return this.state.components.map(c => c.fill);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.name !== this.props.name) {
      this.context.manager.removeOnComponentsChange(this.props.name, this.handleComponentChange);

      const name = nextProps.name;

      this.context.manager.onComponentsChange(name, this.handleComponentChange);
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

        const fillChildProps2 = Object.keys(this.props.fillChildProps).reduce(transform, {});

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
      const results = this.props.children(aggElements);

      if (results) {
        return results;
      } else {
        return null;
      }
    } else {
      return aggElements;
    }
  }
}
