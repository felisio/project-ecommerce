import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils'
import { ApolloConsumer } from 'react-apollo'

import { fakeCartItem, fakeUser } from '../lib/testUtils'
import Cart, { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../components/Cart'
import { CURRENT_USER_QUERY } from '../components/User';

const cartItem = fakeCartItem();

const mock = [
  // current user query
  {
    request: { query: CURRENT_USER_QUERY },
    result: { 
      data: { 
        me: {
          ...fakeUser(),
          cart: [cartItem], 
        }
      },
    },
  },
  {
    request: { query: LOCAL_STATE_QUERY },
    result: { data: { cartOpen: true } },
  }
];

describe('<Cart />', () => {
  it('renders and macth snapshot', async() => {
    const wrapper = mount(
      <MockedProvider mocks={mock}>
        <Cart />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    expect(toJson(wrapper.find('header'))).toMatchSnapshot() 
    // expect(toJson(wrapper.find('CartItem'))).toHaveLength(1) 
  })
})