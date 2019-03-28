import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils'
import { ApolloConsumer } from 'react-apollo'

import { fakeCartItem, fakeUser } from '../lib/testUtils'
import RemoveFromCart, { REMOVE_TO_CART_MUTATION } from '../components/RemoveFromCart'
import { CURRENT_USER_QUERY } from '../components/User';

const cartItem = fakeCartItem();
global.alert = console.log;

const mock = [
  // current user query
  {
    request: { query: CURRENT_USER_QUERY },
    result: { 
      data: { 
        me: {
          ...fakeUser(),
          cart: [fakeCartItem({id: '123'})], 
        }
      },
    },
  },
  {
    request: { query: REMOVE_TO_CART_MUTATION, variables: { id: '123' } },
    result: { 
      data: {
        removeFromCart: {
          __typename: 'CartItem',
          id: '123'
        }
      } 
    },
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { 
      data: { 
        me: {
          ...fakeUser(),
          cart: [], 
        }
      },
    },
  },
];

describe('<AddToCart />', () => {
  it('renders and macth snapshot', async() => {
    const wrapper = mount(
      <MockedProvider mocks={mock}>
        <RemoveFromCart id="123" />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    expect(toJson(wrapper.find('button'))).toMatchSnapshot() 
  })

  it('remove to cart is clicked', async() => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mock}>
        <ApolloConsumer>
          {(client) => {
            apolloClient = client
            return  <RemoveFromCart id="123" />
          }}
        </ApolloConsumer>
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const { data: { me } } = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(me.cart).toHaveLength(1);
    // add item
    wrapper.find('button').simulate('click');
    await wait();
    const { data: { me: me2 } } = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(me2.cart).toHaveLength(0);
  })  
})