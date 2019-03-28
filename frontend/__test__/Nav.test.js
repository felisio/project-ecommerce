import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils'

import Nav from '../components/Nav'
import Signout from '../components/Signout'
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

describe('<Nav />', () => {
  it('renders in minimal nav in sign out', async() => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const nav = wrapper.find('[data-test="nav"]')
    expect(toJson(nav)).toMatchSnapshot()
  })

  it('renders full nav in sign in', async() => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Nav />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const nav = wrapper.find('ul[data-test="nav"]')
    // console.log(nav.debug())
    expect(nav.children().length).toBe(6)
    expect(wrapper.contains(<Signout/>)).toBe(true)
    // expect(toJson(nav)).toMatchSnapshot()
  })
})
