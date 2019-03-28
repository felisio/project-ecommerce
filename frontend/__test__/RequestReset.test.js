import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils'

import RequestReset, { REQUEST_RESET_MUTATION } from '../components/RequestReset';

const mock = [
  {
    request: { 
      query: REQUEST_RESET_MUTATION,
      variables: { email: 'fabio.elisio@gmail.com' }, 
    },
    result: { 
      data: { requestReset: { message: 'success', __typename: 'Message' } }, 
    },
  }
];

describe('<RequestReset />', () => {
  it('renders and mastchs snpashot', async() => {
    const wrapper = mount(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const form = wrapper.find('[data-test="form"]')
    // console.log(form.debug()) 
    expect(toJson(form)).toMatchSnapshot()
  })

  it('calls the mutation', async() => {
    const wrapper = mount(
      <MockedProvider mocks={mock}>
        <RequestReset />
      </MockedProvider>
    );
    // simulate insert email in input
    wrapper
      .find('input')
      .simulate('change', { target: { name: 'email', value: 'fabio.elisio@gmail.com' } })
    // simulate submit 
    wrapper.find('form').simulate('submit');
    await wait();
    wrapper.update();
    // console.log(wrapper.debug())
    expect(wrapper.find('p').text()).toContain('Success! Check your email for a reset link!')
  })
});
