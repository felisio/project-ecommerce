import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils'
import Router from 'next/router'

import { fakeItem } from '../lib/testUtils'
import CreateItem, { CREATE_ITEM_MUTATION } from '../components/CreateItem'

//mock global rest API
const dogImage = 'http://dog.com/dog.jpg'
global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: dogImage,
    eager: [{ secure_url: dogImage }], 
  }),
})
const item = fakeItem();
const mock = [
  {
    request: { 
      query: CREATE_ITEM_MUTATION,
      variables: {
        title: item.title,
        description: item.description,
        image: '',
        largeImage: '',
        price: item.price,
      }, 
    },
    result: { 
      data: { 
        createItem: {
          id: 'a123',
          __typename: 'Item' 
        } 
      }, 
    },
  }
];
Router.router = {
  push: jest.fn(),
  prefetch() {},
}


describe('<CreateItem />', () => {
  it('renders and mastchs snpashot', async() => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const form = wrapper.find('form[data-test="form"]')
    // console.log(form.debug()) 
    expect(toJson(form)).toMatchSnapshot() 
  })

  it('upload a file when change', async() => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const input = wrapper.find('input[type="file"]')
    input.simulate('change', { 
      target: { files: ['fakeDog.jpg'] } 
    })
    await wait();
    wrapper.update();
    const component = wrapper.find('CreateItem').instance()
    expect(component.state.image).toEqual(dogImage)
    expect(component.state.largeImage).toEqual(dogImage)
    expect(global.fetch).toHaveBeenCalled()
    global.fetch.mockReset()
  })

  it('handle state update', async() => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );

    wrapper.find('#title').simulate('change', {
      target: { value: 'Testing', name: 'title' },
    })
    wrapper.find('#price').simulate('change', {
      target: { value: 5000, name: 'price', type: 'number' },
    })
    wrapper.find('#description').simulate('change', {
      target: { value: 'Testing desc', name: 'description' },
    })

    expect(wrapper.find('CreateItem').instance().state).toMatchObject({
      title: 'Testing',
      price: 5000,
      description: 'Testing desc',
    })
  })
  

  it('create an item when the form is subimitted', async() => {
    const wrapper = mount(
      <MockedProvider mocks={mock}>
        <CreateItem />
      </MockedProvider>
    );

    wrapper.find('#title').simulate('change', {
      target: { value: item.title, name: 'title' },
    })
    wrapper.find('#price').simulate('change', {
      target: { value: item.price, name: 'price', type: 'number' },
    })
    wrapper.find('#description').simulate('change', {
      target: { value: item.description, name: 'description' },
    })
    // simulate submit 
    wrapper.find('form').simulate('submit');
    await wait(50);
    expect(Router.router.push).toHaveBeenCalled()
    expect(Router.router.push).toHaveBeenCalledWith({ pathname: '/item', query: { id: 'a123' } });
  })
});
