import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils'

import PleaseSignIn from '../components/PleaseSignIn'
import { CURRENT_USER_QUERY } from '../components/User'
import { fakeUser } from '../lib/testUtils';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  }
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  }
];

describe('<PleaseSignIn />', () => {
  it('render the sign in in dialog to logged out users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <PleaseSignIn />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    // console.log(wrapper.debug())
    expect(wrapper.text()).toContain('Please Sign in!')
    expect(wrapper.find('Signin').exists()).toBe(true)
  })

  it('render the child component when user is sigin', async () => {
    const Hey = () => <p>Hey!</p>
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <PleaseSignIn>
          <Hey/>
        </PleaseSignIn>
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    // console.log(wrapper.debug())
    expect(wrapper.text()).toContain('Hey!')
    expect(wrapper.contains(<Hey/>)).toBe(true)
  })
})