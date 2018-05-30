import Enzyme from 'enzyme';
import EnzymeAdapter from  'enzyme-adapter-react-16';

// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });

// import { configure, shallow, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });
