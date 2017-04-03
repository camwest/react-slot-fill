import * as React from 'react';
import * as Mousetrap from 'mousetrap';
import { Slot, Fill } from '../../lib';

import Settings from './Settings';

export class Binding extends React.Component<any, any> {
    static defaultProps = {
      hotkey: '',
      groupName: '',
      description: '',
      onInvoke: () => { /*no-op*/ }
    };

    render() {
      const { onInvoke, hotkey, groupName, description } = this.props;
      const fillprops = { hotkey, groupName, description };

      return (
        <Fill key="hotkey" name="Keybinding.Hotkey" {...fillprops}>
          <Keybind hotkey={hotkey} onInvoke={onInvoke} />
        </Fill>
      );
    }
  }

export default class Keybinding extends React.Component<any, any> {
  static Binding = Binding;

  constructor(props: any) {
    super(props);
    this.handleRegistered = this.handleRegistered.bind(this);
    this.handleUnregistered = this.handleUnregistered.bind(this);
    this.state = {};
  }

  handleRegistered({ props }: { props: any }) {
    this.setState({
      [props.hotkey]: {
        hotkey: props.hotkey,
        groupName: props.groupName,
        description: props.description
      }
    });
  }

  handleUnregistered({ props }: { props: any }) {
    this.setState({
      [props.hotkey]: null
    });
  }

  render() {
    const groupByFn = (acc: any, key: any) => {
      const binding = this.state[key];

      const existingGroup: any = acc.find((group: any) => group.name === binding.groupName);

      if (existingGroup) {
        existingGroup.bindings.push(binding);
      } else {
        acc.push({
          name: binding.groupName,
          bindings: [binding]
        });
      }

      return acc;
    };

    const groups = Object.keys(this.state).reduce(groupByFn, []);

    return (
      <div>
        <Slot
          name="Keybinding.Hotkey"
          fillChildProps={{ onRegistered: this.handleRegistered, onUnRegistered: this.handleUnregistered }}
        />
        <Settings.Group label="Keybindings">
          <table className="collapse ba br2 b--black-10 pv2 ph3 mt4">
            <thead>
              <tr className="striped--light-gray ">
                <th className="pv2 ph3 tl f6 fw6 ttu">Group</th>
                <th className="tl f6 ttu fw6 pv2 ph3">Hotkey</th>
                <th className="tl f6 ttu fw6 pv2 ph3">Description</th>
              </tr>
            </thead>
            {groups.map((group: any, index: any) => {
              const numItems = group.bindings.length;
              return (
                <tbody key={index.toString()}>
                  {group.bindings.map((binding: any, index2: any) => (
                    <tr key={index.toString() + index2.toString()}>
                      {index2 === 0 &&
                        <td rowSpan={numItems} className="pv2 ph3">{group.name}</td>
                      }
                      <td className="pv2 ph3">{binding.hotkey}</td>
                      <td className="pv2 ph3">{binding.description}</td>
                    </tr>
                  ))}
                </tbody>
              );
            })}
          </table>
        </Settings.Group>
      </div>
    );
  }
}

class Keybind extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleInvoke = this.handleInvoke.bind(this);
  }

  handleInvoke() {
    this.props.onInvoke();
    return false;
  }

  componentWillMount() {
    Mousetrap.bind(this.props.hotkey, this.handleInvoke);
    this.props.onRegistered();
  }

  componentWillUnmount() {
    Mousetrap.unbind(this.props.hotkey);
    this.props.onUnRegistered();
  }

  componentWillReceiveProps(nextProps: any) {
    Mousetrap.unbind(this.props.hotkey);
    Mousetrap.bind(this.props.hotkey, this.handleInvoke);
  }

  render() {
    return null;
  }
}
