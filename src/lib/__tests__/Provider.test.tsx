import * as React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Fill, Slot, Provider } from '../';

configure({ adapter: new Adapter() });

it('tests foo', () => {
  const wrapper = mount(
    <Provider>
      <div>
        <Fill name="FooBar" other="prop">
          <div className="FooBar-className">
            FooBar-Children
          </div>
        </Fill>
      </div>
    </Provider>
  );

  const provider: Provider = wrapper.instance() as any;
  const [fill] = provider.getFillsByName('FooBar');

  if (!fill) {
    throw new Error('expected fill to be defined');
  }

  expect(fill.props.other).toBe('prop');

  const elements = provider.getChildrenByName('FooBar');

  expect(elements.length).toBe(1);
});