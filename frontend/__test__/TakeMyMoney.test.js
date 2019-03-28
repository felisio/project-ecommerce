import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import wait from 'waait';
import NProgress from 'nprogress';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils'
import { ApolloConsumer } from 'react-apollo'

import { fakeOrder, fakeUser, fakeCartItem } from '../lib/testUtils'
import TakeMyMoney, { CREATE_ORDER_MUTATION } from '../components/TakeMyMoney'
import { CURRENT_USER_QUERY } from '../components/User';

Router.router = { push() {} };

const mock = [
  // current user query
  {
    request: { query: CURRENT_USER_QUERY },
    result: { 
      data: { 
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()], 
        }
      },
    },
  },
  {
    request: { query: CREATE_ORDER_MUTATION, variables: { token: '123' } },
    result: { 
      data: {
        createOrder: {
          ...fakeOrder(),
        }
      } 
    },
  },
];

describe('<TakeMyMoney />', () => {
  it('renders and macth snapshot', async() => {
    const wrapper = mount(
      <MockedProvider mocks={mock}>
        <TakeMyMoney />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const checkouButton = wrapper.find('ReactStripeCheckout')
    expect(toJson(checkouButton)).toMatchSnapshot()
  })

  it('create an order onToken', async() => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz978' } }
    })
    const wrapper = mount(
      <MockedProvider mocks={mock}>
        <TakeMyMoney />
      </MockedProvider>
    );
    const component = wrapper.find('TakeMyMoney').instance()
    component.onToken({ id: 'abc123' }, createOrderMock)
    expect(createOrderMock).toHaveBeenCalled()
    expect(createOrderMock).toHaveBeenCalledWith({ variables: { token: 'abc123' } })
  })

  it('turn progress bar on', async() => {
    const wrapper = mount(
      <MockedProvider mocks={mock}>
        <TakeMyMoney />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    NProgress.start = jest.fn()
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz978' } }
    })
    const component = wrapper.find('TakeMyMoney').instance()
    component.onToken({ id: 'abc123' }, createOrderMock)
    expect(NProgress.start).toHaveBeenCalled()
  })

  it('router to the other page when completed', async() => {
    const wrapper = mount(
      <MockedProvider mocks={mock}>
        <TakeMyMoney />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz978' } }
    })
    Router.router.push = jest.fn()
    const component = wrapper.find('TakeMyMoney').instance()
    component.onToken({ id: 'abc123' }, createOrderMock)
    await wait();
    expect(Router.router.push).toHaveBeenCalled()
    expect(Router.router.push).toHaveBeenCalledWith({ 
      pathname: '/order',
      query: { id: 'xyz978' }
    })
  })
  
})