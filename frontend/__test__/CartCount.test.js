import CartCount from '../components/CartCount'
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const mockData = {
  count: 10,
}

describe('<CartCount/>', () => {
  it('renders', () => {
    shallow(<CartCount count={mockData.count}/>) 
  })

  it('match the snapshots', () => {
    const wrapper = shallow(<CartCount count={mockData.count}/>)
    expect(toJson(wrapper)).toMatchSnapshot(); 
  })

  it('updates via props', () => {
    const wrapper = shallow(<CartCount count={mockData.count}/>)
    expect(toJson(wrapper)).toMatchSnapshot(); 
    wrapper.setProps({ count: 30 })
    expect(toJson(wrapper)).toMatchSnapshot(); 
  })
})