describe('Filter search', () => {
  it('Correctly filters the list of characters', () => {
    
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Select search input and filter by name "Morty"
    cy.get('.sc-ksBlkl').type("Morty")

    // Character "Antenna Morty" should be visible
    cy.get('[href="/character/18"] > .sc-ipEyDJ > .sc-jrcTuL').should("be.visible")
  })
})