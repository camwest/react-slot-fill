import React from 'react';

const bus = document.createElement('div');

class Manager {
  constructor() {
    this.handleFillMount = this.handleFillMount.bind(this);
    this.handleFillUpdated = this.handleFillUpdated.bind(this);
    this.handleFillUnmount = this.handleFillUnmount.bind(this);

    this._db = {
      byName: {},             // stores name -> listeners/children
      byFill: new Map(),      // stores fill -> component
      byComponent: new Map()  // stores component -> name
    };

    bus.addEventListener('fill-mount', this.handleFillMount);
    bus.addEventListener('fill-updated', this.handleFillUpdated);
    bus.addEventListener('fill-unmount', this.handleFillUnmount);
  }

  handleFillMount({ detail: { fill }}) {
    const component = React.Children.only(fill.props.children);
    const name = fill.props.name;

    // debugger;

    if (this._db.byName[name]) {
      this._db.byName[name].components.push(component);
    } else {
      this._db.byName[name] = {
        listeners: [],
        components: [component]
      }
    }

    this._db.byFill.set(fill, component);
    this._db.byComponent.set(component, name);

    // notify listeners
    this._db.byName[name].listeners.forEach(fn =>
      fn(this._db.byName[name].components));
  }

  handleFillUpdated({ detail: { fill }}) {
    const oldComponent = this._db.byFill.get(fill);
    const newComponent = React.Children.only(fill.props.children);

    // replace previous contribution with the one in this fill
    const name = this._db.byComponent.get(oldComponent);
    const components = this._db.byName[name].components;

    // Remove old references
    components.splice(components.indexOf(oldComponent), 1, newComponent);
    this._db.byComponent.delete(oldComponent);

    // Add new references
    this._db.byFill.set(fill, newComponent);
    this._db.byComponent.set(newComponent, name);

    // notify listeners
    this._db.byName[name].listeners.forEach(fn => {
      fn(this._db.byName[name].components)
    });
  }

  handleFillUnmount({ detail: { fill }}) {
    const oldComponent = this._db.byFill.get(fill);

    // remove previous contribution
    const name = this._db.byComponent.get(oldComponent);
    const components = this._db.byName[name].components;
    components.splice(components.indexOf(oldComponent), 1);

    // Clean up byFill reference
    this._db.byFill.delete(fill);

    // Clean up oldComponent
    this._db.byComponent.delete(oldComponent);

    if (this._db.byName[name].listeners.length == 0 &&
      this._db.byName[name].components.length == 0) {
      delete this._db.byName[name];
    }

    // notify listeners
    this._db.byName[name].listeners.forEach(fn =>
      fn(this._db.byName[name].components));
  }

  /**
   * Triggers once immediately, then each time the components change for a location
   *
   * name: String, fn: (components: Component[]) => void
   */
  onComponentsChange(name, fn) {
    if (this._db.byName[name]) {
      this._db.byName[name].listeners.push(fn);
    } else {
      this._db.byName[name] = {
        listeners: [fn],
        components: []
      }
    }

    fn(this._db.byName[name].components);
  }

  /**
   * Removes previous listener
   *
   * name: String, fn: (components: Component[]) => void
   */
  removeOnComponentsChange(name, fn) {
    console.log('removeOnComponentsChange', name);
  }
}

const manager = new Manager();

export class Slot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { components: [] };
    this.handleComponentChange = this.handleComponentChange.bind(this);
  }

  componentWillMount() {
    manager.onComponentsChange(this.props.name, this.handleComponentChange);
  }

  handleComponentChange(components) {
    this.setState({ components });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      manager.removeOnComponentsChange(this.props.name, this.handleComponentChange);

      const name = nextProps.name;

      manager.onComponentsChange(name, this.handleComponentChange);
    }
  }

  componentWillUnmount() {
    const name = this.props.name;
    manager.removeOnComponentsChange(name, this.handleComponentChange);
  }

  render() {
    if (typeof this.props.children === 'function') {
      const results = this.props.children(this.state.components);
      return results || null;
    } else {
      return (
        <div>
          {this.state.components}
        </div>
      )
    }
  }
}

export class Fill extends React.Component {
  componentWillMount() {
    bus.dispatchEvent(new CustomEvent('fill-mount', {
      detail: {
        fill: this
      }
    }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name === this.props.name) {
      bus.dispatchEvent(new CustomEvent('fill-updated', {
        detail: {
          fill: this,
        }
      }))
    } else {
      this.componentWillUnmount();
      this.componentWillMount();
    }
  }

  componentWillUnmount() {
    bus.dispatchEvent(new CustomEvent('fill-unmount', {
      detail: {
        fill: this,
      }
    }))
  }

  render() {
    return null;
  }
}