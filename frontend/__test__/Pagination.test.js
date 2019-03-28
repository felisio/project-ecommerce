import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import wait from 'waait';
import Router from 'next/router'
import { MockedProvider } from 'react-apollo/test-utils'

import Pagination, { PAGINATION_QUERY } from '../components/Pagination';

Router.router = {
  push() {},
  prefetch() {},
}

function makeMockFor(lenght) {
  return [
    {
      request: { 
        query: PAGINATION_QUERY
      },
      result: { 
        data: { 
          itemsConnection:  {
            __typename: 'aggregate',
            aggregate: { 
              __typename: 'count',
              count: lenght 
            }
          }
        }, 
      },
    }
  ]
}

describe('<Pagination />', () => {
  it('Display a loading message', async() => {
    const wrapper = mount(
      <MockedProvider mocks={makeMockFor(1)}>
        <Pagination page={1}/>
      </MockedProvider>
    );

    expect(wrapper.text()).toContain('Loading...')
  })
  
  it('render 18 items', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMockFor(18)}>
        <Pagination page={1}/>
      </MockedProvider>
    );
    
    await wait();
    wrapper.update();
    expect(wrapper.find('.total-pages').text()).toEqual('5')
    const pagination = wrapper.find('[data-test="pagination"]')
    expect(toJson(pagination)).toMatchSnapshot()
  })

  it('disable prev button on the first page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMockFor(5)}>
        <Pagination page={1}/>
      </MockedProvider>
    );
    
    await wait();
    wrapper.update();
    expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(true)
    expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(false)
  })


  it('disable next button on the last page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMockFor(5)}>
        <Pagination page={3}/>
      </MockedProvider>
    );
    
    await wait();
    wrapper.update();
    expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(false)
    expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(true)
  })

  it('enable all buttons on the middle page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMockFor(15)}>
        <Pagination page={2}/>
      </MockedProvider>
    );
    
    await wait();
    wrapper.update();
    expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(false)
    expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(false)
  })

})
