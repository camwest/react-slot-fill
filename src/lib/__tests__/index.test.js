import React from 'react';
import renderer from 'react-test-renderer';
import { Fill, Slot, Provider } from '../';

const Toolbar = (props) =>
  <div>
    <Slot name="Toolbar.Item" />
  </div>

Toolbar.Item = ({ label }) =>
  <Fill name="Toolbar.Item">
    <button>{label}</button>
  </Fill>

const Footer = (props) =>
  <div>
    <Slot name="Footer.Item" />
  </div>

Footer.Item = ({ href, label }) =>
  <Fill name="Footer.Item">
    <a href={href}>{label}</a>
  </Fill>

it('Fills the a simple slot', () => {
  const Feature = () => <Toolbar.Item label="Home 1" />;

  const fillComponent = renderer.create(
    <Provider>
      <Toolbar />
      <Feature />
    </Provider>
  );

  expect(fillComponent).toMatchSnapshot();
})

it('Fills the appropriate slot', () => {
  const Feature = () => [
    <Toolbar.Item label="Home 2" />,
    <Toolbar.Item label="About" />,
    <Footer.Item label="Twitter" href="twitter.com/reactjs" />,
  ];

  const fillComponent = renderer.create(
    <Provider>
      <Toolbar />
      <Footer />
      <Feature />
    </Provider>
  );

  expect(fillComponent).toMatchSnapshot();
});

it('Replaces the contents of the slot with the matching fill when the slot\'s `name` property changes', () => {
  const DynamicToolbar = ({name}) =>
    <div>
      <Slot name={name} />
    </div>

  // This example is contrived, but it covers Slot's componentWillReceiveProps 
  DynamicToolbar.Active = ({ label }) =>
    <Fill name="DynamicToolbar.Active">
      <button>{label}</button>
    </Fill>

  DynamicToolbar.Inactive = ({ label }) =>
    <Fill name="DynamicToolbar.Inactive">
      <span>{label}</span>
    </Fill>

  const Feature = () => [
    <DynamicToolbar.Active label="Home 1" />,
    <DynamicToolbar.Inactive label="Home 1" />,
  ]

  const fillComponent = renderer.create(
    <Provider>
      <DynamicToolbar name="DynamicToolbar.Active" />
      <Feature />
    </Provider>
  );

  fillComponent.update(
    <Provider>
      <DynamicToolbar name="DynamicToolbar.Inactive" />
      <Feature />
    </Provider>
  );

  expect(fillComponent).toMatchSnapshot();
});

it('Removes the slot and fill.', () => {
  const Feature = () => <Toolbar.Item label="Home 1" />;

  const fillComponent = renderer.create(
    <Provider>
      <Toolbar />
      <Feature />
    </Provider>
  );

  fillComponent.unmount();

  expect(fillComponent).toMatchSnapshot();
});
