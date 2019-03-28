import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils'
import { ApolloConsumer } from 'react-apollo'

import Signup, { SIGNUP_MUTATION } from '../components/Signup'; 
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

function type(wrapper, name, value) {
  wrapper.find(`input[name="${name}"]`).simulate('change', {
    target: { value, name},
  })
}

const me = fakeUser()
const mock = [
  {
    request: { 
      query: SIGNUP_MUTATION,
      variables: {
        email: me.email,
        password: '123',
        name: me.name,
      }, 
    },
    result: { 
      data: { 
        signup: {
          __typename: 'User',
          email: me.email,
          id: '123',
          name: me.name,
          permissions: [],
        } 
      }, 
    },
  },
  // current user query
  {
    request: { query: CURRENT_USER_QUERY },
    result: { 
      data: { me },
    },
  }
];

describe('<Signup />', () => {
  it('renders and mastchs snpashot', async() => {
    const wrapper = mount(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const form = wrapper.find('form[data-test="form"]')
    // console.log(form.debug()) 
    expect(toJson(form)).toMatchSnapshot() 
  })

  it('call the mutaion properly', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mock}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <Signup />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    
    
    await wait();
    wrapper.update();
    
    type(wrapper, 'email', me.email)
    type(wrapper, 'name', me.name)
    type(wrapper, 'password', '123')
    
    wrapper.update();
    wrapper.find('form[data-test="form"]').simulate('submit');
    await wait();
    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(user.data.me).toMatchObject(me)
  })
})