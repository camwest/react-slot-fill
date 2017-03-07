'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var bus = document.createElement('div');

var Manager = function () {
  function Manager() {
    classCallCheck(this, Manager);

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

    bus.addEventListener('fill-mount', this.handleFillMount);
    bus.addEventListener('fill-updated', this.handleFillUpdated);
    bus.addEventListener('fill-unmount', this.handleFillUnmount);
  }

  createClass(Manager, [{
    key: 'handleFillMount',
    value: function handleFillMount(_ref) {
      var _this = this;

      var fill = _ref.detail.fill;

      var elements = React.Children.toArray(fill.props.children);
      var name = fill.props.name;
      var component = { fill: fill, elements: elements, name: name };

      // If the name is already registered
      if (this._db.byName[name]) {
        this._db.byName[name].components.push(component);
      } else {
        this._db.byName[name] = {
          listeners: [],
          components: [component]
        };
      }

      this._db.byFill.set(fill, component);

      // notify listeners
      this._db.byName[name].listeners.forEach(function (fn) {
        return fn(_this._db.byName[name].components);
      });
    }
  }, {
    key: 'handleFillUpdated',
    value: function handleFillUpdated(_ref2) {
      var _this2 = this;

      var fill = _ref2.detail.fill;

      // Find the component
      var component = this._db.byFill.get(fill);

      // Get the new elements
      var newElements = React.Children.toArray(fill.props.children);

      // replace previous element with the new one
      component.elements = newElements;

      var name = component.name;

      // notify listeners
      this._db.byName[name].listeners.forEach(function (fn) {
        fn(_this2._db.byName[name].components);
      });
    }
  }, {
    key: 'handleFillUnmount',
    value: function handleFillUnmount(_ref3) {
      var _this3 = this;

      var fill = _ref3.detail.fill;

      var oldComponent = this._db.byFill.get(fill);

      var name = oldComponent.name;

      var components = this._db.byName[name].components;

      // remove previous component
      components.splice(components.indexOf(oldComponent), 1);

      // Clean up byFill reference
      this._db.byFill.delete(fill);

      if (this._db.byName[name].listeners.length === 0 && this._db.byName[name].components.length === 0) {
        delete this._db.byName[name];
      } else {
        // notify listeners
        this._db.byName[name].listeners.forEach(function (fn) {
          return fn(_this3._db.byName[name].components);
        });
      }
    }

    /**
     * Triggers once immediately, then each time the components change for a location
     *
     * name: String, fn: (components: Component[]) => void
     */

  }, {
    key: 'onComponentsChange',
    value: function onComponentsChange(name, fn) {
      if (this._db.byName[name]) {
        this._db.byName[name].listeners.push(fn);
      } else {
        this._db.byName[name] = {
          listeners: [fn],
          components: []
        };
      }

      fn(this._db.byName[name].components);
    }

    /**
     * Removes previous listener
     *
     * name: String, fn: (components: Component[]) => void
     */

  }, {
    key: 'removeOnComponentsChange',
    value: function removeOnComponentsChange(name, fn) {
      var listeners = this._db.byName[name].listeners;
      listeners.splice(listeners.indexOf(fn), 1);
    }
  }]);
  return Manager;
}();

var manager = new Manager();

var Slot = function (_React$Component) {
  inherits(Slot, _React$Component);

  function Slot(props) {
    classCallCheck(this, Slot);

    var _this4 = possibleConstructorReturn(this, (Slot.__proto__ || Object.getPrototypeOf(Slot)).call(this, props));

    _this4.state = { components: [] };
    _this4.handleComponentChange = _this4.handleComponentChange.bind(_this4);
    return _this4;
  }

  createClass(Slot, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      manager.onComponentsChange(this.props.name, this.handleComponentChange);
    }

    /**
     * components: Component[]
     */

  }, {
    key: 'handleComponentChange',
    value: function handleComponentChange(components) {
      // debugger;
      this.setState({ components: components });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.name !== this.props.name) {
        manager.removeOnComponentsChange(this.props.name, this.handleComponentChange);

        var name = nextProps.name;

        manager.onComponentsChange(name, this.handleComponentChange);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var name = this.props.name;
      manager.removeOnComponentsChange(name, this.handleComponentChange);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var aggElements = [];

      this.state.components.forEach(function (component, index) {
        var fill = component.fill,
            elements = component.elements;


        if (_this5.props.exposedProps) {
          var exposedProps = Object.keys(_this5.props.exposedProps).reduce(function (acc, key) {
            var value = _this5.props.exposedProps[key];

            if (typeof value === 'function') {
              acc[key] = function () {
                return value(fill, _this5.fills);
              };
            } else {
              acc[key] = value;
            }

            return acc;
          }, {});

          elements.forEach(function (element, index2) {
            aggElements.push(React.cloneElement(element, Object.assign({ key: index.toString() + index2.toString() }, exposedProps)));
          });
        } else {
          elements.forEach(function (element, index2) {
            aggElements.push(React.cloneElement(element, { key: index.toString() + index2.toString() }));
          });
        }
      });

      if (typeof this.props.children === 'function') {
        var results = this.props.children(aggElements);

        if (results) {
          return results;
        } else {
          return null;
        }
      } else {
        // debugger;
        return aggElements;
      }
    }
  }, {
    key: 'fills',
    get: function get$$1() {
      return this.state.components.map(function (c) {
        return c.fill;
      });
    }
  }]);
  return Slot;
}(React.Component);

var Fill = function (_React$Component2) {
  inherits(Fill, _React$Component2);

  function Fill() {
    classCallCheck(this, Fill);
    return possibleConstructorReturn(this, (Fill.__proto__ || Object.getPrototypeOf(Fill)).apply(this, arguments));
  }

  createClass(Fill, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      bus.dispatchEvent(new CustomEvent('fill-mount', {
        detail: {
          fill: this
        }
      }));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      bus.dispatchEvent(new CustomEvent('fill-updated', {
        detail: {
          fill: this
        }
      }));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      bus.dispatchEvent(new CustomEvent('fill-unmount', {
        detail: {
          fill: this
        }
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Fill;
}(React.Component);

exports.Slot = Slot;
exports.Fill = Fill;
