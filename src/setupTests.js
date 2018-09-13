/**
 * @prettier
 * @description: Set up module for Jest test framework
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Polyfill for cancelAnimationFrame
global.cancelAnimationFrame = function(callback) {
  setTimeout(callback, 0)
}

configure({ adapter: new Adapter() })
