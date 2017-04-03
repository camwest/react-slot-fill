import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Fill, Slot, Provider } from '../';

class Toolbar extends React.Component<any, any> {
  static Item = ({ label }: { label: string }) => (
    <Fill name="Toolbar.Item">
      <button>{label}</button>
    </Fill>
  )

  render() {
    return (
      <div>
        <Slot name="Toolbar.Item" />
      </div>
    );
  }
}

class Footer extends React.Component<any, any> {
  static Item = ({ href, label }: { href: string, label: string }) => (
    <Fill name="Footer.Item">
      <a href={href}>{label}</a>
    </Fill>
  )

  render() {
    return (
      <div>
        <Slot name="Footer.Item" />
      </div>
    );
  }
}

it('Fills the a simple slot', () => {
  const Feature = () => <Toolbar.Item label="Home 1" />;

  const fillComponent = renderer.create(
    <Provider>
      <div>
        <Toolbar />
        <Feature />
      </div>
    </Provider>
  );

  expect(fillComponent).toMatchSnapshot();
});

it('Fills the appropriate slot', () => {
  class Feature extends React.Component<any, any> {
    render() {
      return (
        <div>
          <Toolbar.Item label="Home 2" />
          <Toolbar.Item label="About" />
          <Footer.Item label="Twitter" href="twitter.com/reactjs" />
        </div>
      );
    }
  }

  const fillComponent = renderer.create(
    <Provider>
      <div>
        <Toolbar />
        <Footer />
        <Feature />
      </div>
    </Provider>
  );

  expect(fillComponent).toMatchSnapshot();
});

it('Replaces the contents of the slot with the matching fill when the slot\'s `name` property changes', () => {

  class DynamicToolbar extends React.Component<any, any> {
    // This example is contrived, but it covers Slot's componentWillReceiveProps
    static Active = ({ label }: { label: string }) => (
      <Fill name="DynamicToolbar.Active">
        <button>{label}</button>
      </Fill>
    )

    static Inactive = ({ label }: { label: string }) => (
      <Fill name="DynamicToolbar.Inactive">
        <span>{label}</span>
      </Fill>
    )

    render() {
      return (
        <div>
          <Slot name={this.props.name} />
        </div>
      );
    }
  }

  class Feature extends React.Component<any, any> {
    render() {
      return (
        <div>
          <DynamicToolbar.Active label="Home 1" />,
          <DynamicToolbar.Inactive label="Home 1" />,
        </div>
      );
    }
  }

  const fillComponent: any = renderer.create(
    <Provider>
      <div>
        <DynamicToolbar name="DynamicToolbar.Active" />
        <Feature />
      </div>
    </Provider>
  );

  fillComponent.update(
    <Provider>
      <div>
        <DynamicToolbar name="DynamicToolbar.Inactive" />
        <Feature />
      </div>
    </Provider>
  );

  expect(fillComponent).toMatchSnapshot();
});
