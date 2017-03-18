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