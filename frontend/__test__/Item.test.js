import Item from '../components/Item'
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const mockData = {
  id: 'Abc123',
  title: 'A cool item',
  price: 5000,
  description: 'Cool item desc',
  image: 'dog.js',
  largeImage: 'large-dog.js',
}

describe('<Item/>', () => {
  it('renders and display properly', () => {
    const wrapper = shallow(<Item item={mockData} />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });

  it('renders and display properly', () => {
    const wrapper = shallow(<Item item={mockData} />);
    // console.log(wrapper.debug())
    const PriceTag = wrapper.find('PriceTag')
    expect(PriceTag.children().text()).toBe('$50');
    expect(wrapper.find('Title a').text()).toBe(mockData.title)
    expect(wrapper.find('p').text()).toBe(mockData.description)
  });

  it('renders the img properly', () => {
    const wrapper = shallow(<Item item={mockData} />);
    expect(wrapper.find('img').props().src).toBe(mockData.image)
    expect(wrapper.find('img').props().alt).toBe(mockData.title)
  });

  it('renders the buttons properly', () => {
    const wrapper = shallow(<Item item={mockData} />);
    const buttonList = wrapper.find('.buttonList')
    expect(buttonList.children()).toHaveLength(3)
    expect(buttonList.find('Link')).toBeTruthy()
    expect(buttonList.find('AddToCart').exists()).toBe(true)
    expect(buttonList.find('DeleteItem')).toBeTruthy()
  });
});