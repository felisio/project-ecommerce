import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils'
import { ApolloConsumer } from 'react-apollo'

import { fakeCartItem, fakeUser } from '../lib/testUtils'
import AddToCart, { ADD_TO_CART_MUTATION } from '../components/AddToCart'
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
          cart: [], 
        }
      },
    },
  },
  {
    request: { query: ADD_TO_CART_MUTATION, variables: { id: '123' } },
    result: { 
      data: {
        addToCart: {
          ...cartItem,
          quantity: 1,
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
          cart: [cartItem], 
        }
      },
    },
  },
];

describe('<AddToCart />', () => {
  it('renders and macth snapshot', async() => {
    const wrapper = mount(
      <MockedProvider mocks={mock}>
        <AddToCart id="123" />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    expect(toJson(wrapper.find('button'))).toMatchSnapshot() 
  })

  it('add to cart is clicked', async() => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mock}>
        <ApolloConsumer>
          {(client) => {
            apolloClient = client
            return  <AddToCart id="123" />
          }}
        </ApolloConsumer>
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const { data: { me } } = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(me.cart).toHaveLength(0);
    // add item
    wrapper.find('button').simulate('click');
    await wait();
    const { data: { me: me2 } } = await apolloClient.query({ query: CURRENT_USER_QUERY })
    expect(me2.cart).toHaveLength(1);
    expect(me2.cart[0].id).toBe('omg123');
  })
})