'use strict'

import { Component1 } from './testFolder/component'

const foo = () => false
foo()
//debugger -> suurce-map
console.log(LANG)

if (NODE_ENV === 'development') {
  alert('development')
}

console.log('Component1', Component1)

export const welcome = () => alert('welcome')
