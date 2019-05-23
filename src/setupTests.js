/**
 * @prettier
 * @description: Jest configuration
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license
 */
import storage from './domain/xhr/base/_mock_'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Add WEB Storage API to the global object
storage()

configure({ adapter: new Adapter() })
