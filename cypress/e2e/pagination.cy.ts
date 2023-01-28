describe('Pagination', () => {
  it('Correctly change pages', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Click next page button
    cy.get('.sc-eDWCr > :nth-child(3)').click()

    cy.get('.sc-eDWCr > p').invoke("text").should("equal", "2")

    // click the previous page button
    cy.get('.sc-eDWCr > :nth-child(1)').click()
    cy.get('.sc-eDWCr > p').invoke("text").should("equal", "1")
  })
})

export {}