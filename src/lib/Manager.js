import { Children } from 'react';

export default class Manager {
  constructor(bus) {
    this._bus = bus;

    this.handleFillMount = this.handleFillMount.bind(this);
    this.handleFillUpdated = this.handleFillUpdated.bind(this);
    this.handleFillUnmount = this.handleFillUnmount.bind(this);

    /**
     * // The name of the slot
     * type Name = string;
     *
     * // The callback function a Fill uses to be notified when a Slot changes
     * type Listener = (components: Component[]) => void
     *
     * // The Fill and it's corresponding React Element
     * interface Component {
     *  name: Name;
     *  fill: Fill;
     *  element: React.Element;
     * }
     *
     * interface FillRegistration {
     *   listeners: Listener[];
     *   components: Component[];
     * }
     */

    this._db = {
      /**
       * {[key: Name]: FillRegistration
       */
      byName: {},

      /**
       * Map<Fill, Component>
       */
      byFill: new Map()
    };
  }

  mount() {
    this._bus.on('fill-mount', this.handleFillMount);
    this._bus.on('fill-updated', this.handleFillUpdated);
    this._bus.on('fill-unmount', this.handleFillUnmount);
  }

  unmount() {
    this._bus.off('fill-mount', this.handleFillMount);
    this._bus.off('fill-updated', this.handleFillUpdated);
    this._bus.off('fill-unmount', this.handleFillUnmount);
  }

  handleFillMount({ fill }) {
    const elements = Children.toArray(fill.props.children);
    const name = fill.props.name;
    const component = { fill, elements, name };

    // If the name is already registered
    if (this._db.byName[name]) {
      this._db.byName[name].components.push(component);
    } else {
      this._db.byName[name] = {
        listeners: [],
        components: [component]
      }
    }

    this._db.byFill.set(fill, component);

    // notify listeners
    this._db.byName[name].listeners.forEach(fn =>
      fn(this._db.byName[name].components));
  }

  handleFillUpdated({ fill }) {
    // Find the component
    const component = this._db.byFill.get(fill);

    // Get the new elements
    const newElements = Children.toArray(fill.props.children);

    // replace previous element with the new one
    component.elements = newElements;

    const name = component.name;

    // notify listeners
    this._db.byName[name].listeners.forEach(fn => {
      fn(this._db.byName[name].components)
    });
  }

  handleFillUnmount({ fill }) {
    const oldComponent = this._db.byFill.get(fill);

    const name = oldComponent.name;

    const components = this._db.byName[name].components;

    // remove previous component
    components.splice(components.indexOf(oldComponent), 1);

    // Clean up byFill reference
    this._db.byFill.delete(fill);

    if (this._db.byName[name].listeners.length === 0 &&
      this._db.byName[name].components.length === 0) {
      delete this._db.byName[name];
    } else {
      // notify listeners
      this._db.byName[name].listeners.forEach(fn =>
        fn(this._db.byName[name].components));
    }
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
    const listeners = this._db.byName[name].listeners;
    listeners.splice(listeners.indexOf(fn), 1);
  }
}