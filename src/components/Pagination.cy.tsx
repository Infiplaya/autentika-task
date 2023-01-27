import React from 'react'
import { Pagination } from './Pagination'

describe('<Pagination />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Pagination />)
  })
})